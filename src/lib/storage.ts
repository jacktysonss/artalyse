import type { AnalysisResult, SavedAnalysis, TokenUsage } from "./types";

const DB_NAME = "artalyse";
const DB_VERSION = 1;
const STORE_NAME = "analyses";

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: "id" });
        store.createIndex("savedAt", "savedAt", { unique: false });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function tx(
  db: IDBDatabase,
  mode: IDBTransactionMode
): IDBObjectStore {
  return db.transaction(STORE_NAME, mode).objectStore(STORE_NAME);
}

/**
 * Migrate old saved records to the current schema.
 * - Old records may have appGuidance.clipStudioPaint — strip it
 * - Old records may lack tokenUsage — that's fine (optional field)
 * - Ensures imageBlob and analysis exist (otherwise record is corrupt)
 */
function migrateRecord(raw: Record<string, unknown>): SavedAnalysis | null {
  if (!raw.id || !raw.imageBlob || !raw.analysis) return null;

  const analysis = raw.analysis as Record<string, unknown>;

  // Ensure appGuidance has the expected shape
  if (analysis.appGuidance) {
    const guidance = analysis.appGuidance as Record<string, unknown>;
    // Remove old clipStudioPaint if present
    delete guidance.clipStudioPaint;

    // If missing expected apps, add empty stubs so the UI doesn't crash
    if (!guidance.adobeFresco) {
      guidance.adobeFresco = emptyAppGuidance("Adobe Fresco");
    }
    if (!guidance.procreate) {
      guidance.procreate = emptyAppGuidance("Procreate");
    }
  }

  return {
    id: raw.id as string,
    imageBlob: raw.imageBlob as Blob,
    analysis: analysis as unknown as AnalysisResult,
    savedAt: (raw.savedAt as number) ?? Date.now(),
    tokenUsage: raw.tokenUsage as TokenUsage | undefined,
  };
}

function emptyAppGuidance(appName: string) {
  return {
    appName,
    brushes: [],
    layerStrategy: "Not available for this saved analysis.",
    blendingModes: [],
    penSettings: {
      pressure: "Not available.",
      tilt: "Not available.",
      smoothing: "Not available.",
    },
    steps: ["Re-analyze the artwork to get updated guidance for this app."],
  };
}

export async function saveAnalysis(
  imageBlob: Blob,
  analysis: AnalysisResult,
  tokenUsage?: TokenUsage
): Promise<string> {
  const db = await openDB();
  const id = crypto.randomUUID();
  const record: SavedAnalysis = {
    id,
    imageBlob,
    analysis,
    savedAt: Date.now(),
    tokenUsage,
  };

  return new Promise((resolve, reject) => {
    const request = tx(db, "readwrite").put(record);
    request.onsuccess = () => resolve(id);
    request.onerror = () => reject(request.error);
  });
}

export async function getAllSaved(): Promise<SavedAnalysis[]> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const request = tx(db, "readonly").index("savedAt").getAll();
    request.onsuccess = () => {
      const raw = request.result as Record<string, unknown>[];
      const results = raw
        .map(migrateRecord)
        .filter((r): r is SavedAnalysis => r !== null)
        .reverse(); // newest first
      resolve(results);
    };
    request.onerror = () => reject(request.error);
  });
}

export async function getSavedById(
  id: string
): Promise<SavedAnalysis | undefined> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const request = tx(db, "readonly").get(id);
    request.onsuccess = () => {
      if (!request.result) {
        resolve(undefined);
        return;
      }
      resolve(
        migrateRecord(request.result as Record<string, unknown>) ?? undefined
      );
    };
    request.onerror = () => reject(request.error);
  });
}

export async function deleteSaved(id: string): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const request = tx(db, "readwrite").delete(id);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}
