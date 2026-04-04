export interface Technique {
  name: string;
  confidence: 'high' | 'medium' | 'low';
  description: string;
}

export interface RecreationStep {
  step: number;
  title: string;
  description: string;
  tips: string[];
}

export interface RecreationGuide {
  overview: string;
  steps: RecreationStep[];
  estimatedTime: string;
  skillLevel: 'beginner' | 'intermediate' | 'advanced';
  materialsNeeded: string[];
}

export interface AppGuidance {
  appName: string;
  brushes: string[];
  layerStrategy: string;
  blendingModes: string[];
  penSettings: {
    pressure: string;
    tilt: string;
    smoothing: string;
  };
  steps: string[];
}

export interface AnalysisResult {
  techniques: Technique[];
  medium: string;
  style: string;
  colorPalette: string[];
  recreationGuide: RecreationGuide;
  appGuidance: {
    adobeFresco: AppGuidance;
    procreate: AppGuidance;
  };
}

export interface TokenUsage {
  inputTokens: number;
  outputTokens: number;
  model: string;
}

export interface SavedAnalysis {
  id: string;
  imageBlob: Blob;
  analysis: AnalysisResult;
  savedAt: number;
  tokenUsage?: TokenUsage;
  thumbnailUrl?: string; // transient, created from imageBlob at runtime
}
