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
      // Return newest first
      const results = (request.result as SavedAnalysis[]).reverse();
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
    request.onsuccess = () => resolve(request.result as SavedAnalysis | undefined);
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
