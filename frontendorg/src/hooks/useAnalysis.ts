import { useState, useEffect } from 'react';
import analysisService from '@/services/analysisService';
import type { Analysis } from '@/types/analysis';

export function useAnalysis(analysisId: string | null) {
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!analysisId) return;

    const fetchAnalysis = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await analysisService.getAnalysis(analysisId);
        setAnalysis(data);

        // Poll if still processing
        if (data.status === 'processing' || data.status === 'pending') {
          setTimeout(() => {
            fetchAnalysis();
          }, 3000); // Poll every 3 seconds
        }
      } catch (err: any) {
        setError(err.message || 'Failed to fetch analysis');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, [analysisId]);

  return { analysis, loading, error };
}

export function useAnalysisList() {
  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalyses = async (skip = 0, limit = 10) => {
    setLoading(true);
    setError(null);

    try {
      const data = await analysisService.listAnalyses(skip, limit);
      setAnalyses(data.analyses);
      setTotal(data.total);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch analyses');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalyses();
  }, []);

  return { analyses, total, loading, error, refetch: fetchAnalyses };
}