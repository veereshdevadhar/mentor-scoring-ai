export interface Scores {
  engagement: number;
  communication: number;
  technical_depth: number;
  clarity: number;
  interaction: number;
  overall: number;
}

export interface Insights {
  strengths: string[];
  improvements: string[];
  recommendations: string[];
  key_highlights?: string;
}

export interface AudioFeatures {
  duration?: number;
  energy_mean?: number;
  energy_std?: number;
  pitch_mean?: number;
  pitch_std?: number;
  speech_rate?: number;
  pause_ratio?: number;
  sample_rate?: number;
}

export interface VisualFeatures {
  total_frames?: number;
  samples_analyzed?: number;
  gesture_count?: number;
  face_confidence?: number;
  face_presence_ratio?: number;
  eye_contact_ratio?: number;
  hand_gestures?: number;
}

export interface NLPAnalysis {
  technical_depth_score?: number;
  clarity_score?: number;
  structure_score?: number;
  question_count?: number;
  technical_term_count?: number;
  word_count?: number;
}

export type AnalysisStatus = 'pending' | 'processing' | 'completed' | 'failed';

export interface Analysis {
  id: string;
  mentor_id: string;
  mentor_name: string;
  subject: string;
  video_filename: string;
  video_duration?: number;
  status: AnalysisStatus;
  scores?: Scores;
  insights?: Insights;
  transcript?: string;
  audio_features?: AudioFeatures;
  visual_features?: VisualFeatures;
  nlp_analysis?: NLPAnalysis;
  created_at: string;
  updated_at: string;
  completed_at?: string;
  error?: string;
}

export interface AnalysisListResponse {
  analyses: Analysis[];
  total: number;
  skip: number;
  limit: number;
}

export interface UploadResponse {
  analysis_id: string;
  status: string;
  message: string;
}