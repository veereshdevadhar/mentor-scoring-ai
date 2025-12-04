export interface MentorStats {
  id: string;
  mentor_name: string;
  total_sessions: number;
  average_score: number;
  last_session?: string;
}

export interface TopMentor {
  rank: number;
  id: string;
  mentor_name: string;
  average_score: number;
  total_sessions: number;
}

export interface MentorDetail {
  mentor_id: string;
  mentor_name: string;
  total_sessions: number;
  completed_sessions: number;
  average_score: number;
  highest_score: number;
  lowest_score: number;
  recent_analyses: any[];
}

export interface MentorListResponse {
  mentors: MentorStats[];
}

export interface TopMentorsResponse {
  top_mentors: TopMentor[];
}