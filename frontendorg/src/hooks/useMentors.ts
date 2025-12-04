import { useState, useEffect } from 'react';
import analysisService from '@/services/analysisService';
import type { TopMentor, MentorStats, MentorDetail } from '@/types/mentor';

export function useTopMentors(limit = 10) {
  const [topMentors, setTopMentors] = useState<TopMentor[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopMentors = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await analysisService.getTopMentors(limit);
        setTopMentors(data.top_mentors || []);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch top mentors');
      } finally {
        setLoading(false);
      }
    };

    fetchTopMentors();
  }, [limit]);

  return { topMentors, loading, error };
}

export function useMentorList() {
  const [mentors, setMentors] = useState<MentorStats[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMentors = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await analysisService.listMentors();
        setMentors(data.mentors || []);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch mentors');
      } finally {
        setLoading(false);
      }
    };

    fetchMentors();
  }, []);

  return { mentors, loading, error };
}

export function useMentorDetails(mentorId: string | null) {
  const [mentorDetails, setMentorDetails] = useState<MentorDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!mentorId) {
      setMentorDetails(null);
      return;
    }

    const fetchMentorDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await analysisService.getMentorDetails(mentorId);
        setMentorDetails(data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch mentor details');
        setMentorDetails(null);
      } finally {
        setLoading(false);
      }
    };

    fetchMentorDetails();
  }, [mentorId]);

  return { mentorDetails, loading, error };
}