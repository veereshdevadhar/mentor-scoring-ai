import api from './api';

export interface UploadVideoData {
  video: File;
  mentor_name: string;
  subject: string;
  mentor_id?: string;
}

export const analysisService = {
  /**
   * Upload video for analysis
   */
  uploadVideo: async (data: UploadVideoData) => {
    const formData = new FormData();
    formData.append('video', data.video);
    formData.append('mentor_name', data.mentor_name);
    formData.append('subject', data.subject);
    if (data.mentor_id) {
      formData.append('mentor_id', data.mentor_id);
    }

    const response = await api.post('/api/analysis/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  /**
   * Get analysis by ID
   */
  getAnalysis: async (analysisId: string) => {
    const response = await api.get(`/api/analysis/${analysisId}`);
    return response.data;
  },

  /**
   * List all analyses with pagination
   */
  listAnalyses: async (skip = 0, limit = 10) => {
    const response = await api.get(`/api/analysis`, {
      params: { skip, limit }
    });
    return response.data;
  },

  /**
   * Get top mentors
   */
  getTopMentors: async (limit = 10) => {
    const response = await api.get(`/api/mentors/top`, {
      params: { limit }
    });
    return response.data;
  },

  /**
   * List all mentors
   */
  listMentors: async () => {
    const response = await api.get('/api/mentors');
    return response.data;
  },

  /**
   * Get mentor details
   */
  getMentorDetails: async (mentorId: string) => {
    const response = await api.get(`/api/mentors/${mentorId}`);
    return response.data;
  },

  /**
   * Health check
   */
  healthCheck: async () => {
    const response = await api.get('/api/health');
    return response.data;
  },

  /**
   * Database health check
   */
  dbHealthCheck: async () => {
    const response = await api.get('/api/health/db');
    return response.data;
  },
};

export default analysisService;