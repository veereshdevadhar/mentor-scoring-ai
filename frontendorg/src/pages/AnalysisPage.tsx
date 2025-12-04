import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useAnalysis } from '@/hooks/useAnalysis';
import { Button } from '@/components/ui/button';
import AnalysisProgress from '@/components/analysis/AnalysisProgress';
import ResultsDashboard from '@/components/results/ResultsDashboard';

export default function AnalysisPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { analysis, loading, error } = useAnalysis(id || null);

  if (loading && !analysis) {
    return (
      <div className="container py-12">
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mb-4" />
          <p className="text-gray-600">Loading analysis...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
          <p className="text-red-700 mb-4">{error}</p>
          <Button onClick={() => navigate('/')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="container py-12">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8 text-center">
          <p className="text-yellow-700 mb-4">Analysis not found</p>
          <Button onClick={() => navigate('/')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container py-8">
        {/* Header */}
        <div className="mb-8">
          <Button variant="outline" onClick={() => navigate('/')} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
          <h1 className="text-3xl font-bold text-gray-800">
            Analysis Results: {analysis.mentor_name}
          </h1>
          <p className="text-gray-600 mt-1">
            Subject: {analysis.subject} • Analyzed on {new Date(analysis.created_at).toLocaleDateString()}
          </p>
        </div>

        {/* Progress */}
        {(analysis.status === 'pending' || analysis.status === 'processing') && (
          <div className="mb-8">
            <AnalysisProgress status={analysis.status} />
          </div>
        )}

        {/* Results */}
        {analysis.status === 'completed' && (
          <ResultsDashboard analysis={analysis} />
        )}

        {/* Failed */}
        {analysis.status === 'failed' && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
            <p className="text-red-700 text-lg">
              Analysis failed. Please try uploading the video again.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}