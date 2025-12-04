import { useTopMentors } from '@/hooks/useMentors';
import { useAnalysisList } from '@/hooks/useAnalysis';
import { Loader2, TrendingUp, Users, BarChart3 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import ComparativeDashboard from '@/components/dashboard/ComparativeDashboard';

export default function DashboardPage() {
  const { topMentors, loading: mentorsLoading } = useTopMentors(10);
  const { analyses, total, loading: analysesLoading } = useAnalysisList();

  const loading = mentorsLoading || analysesLoading;

  // Calculate stats
  const completedAnalyses = analyses.filter(a => a.status === 'completed').length;
  const averageScore = completedAnalyses > 0
    ? analyses
        .filter(a => a.scores)
        .reduce((sum, a) => sum + (a.scores?.overall || 0), 0) / completedAnalyses
    : 0;

  const latestAnalysis = analyses.find(a => a.status === 'completed' && a.scores);

  if (loading) {
    return (
      <div className="container py-12">
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mb-4" />
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            Analytics Dashboard
          </h1>
          <p className="text-gray-600">
            Comprehensive overview of mentor performance and trends
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm mb-1">Total Sessions</p>
                  <p className="text-4xl font-bold">{total}</p>
                </div>
                <BarChart3 className="h-12 w-12 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm mb-1">Average Score</p>
                  <p className="text-4xl font-bold">{averageScore.toFixed(1)}</p>
                </div>
                <TrendingUp className="h-12 w-12 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm mb-1">Active Mentors</p>
                  <p className="text-4xl font-bold">{topMentors.length}</p>
                </div>
                <Users className="h-12 w-12 text-purple-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Comparative Dashboard */}
        <ComparativeDashboard
          topMentors={topMentors}
          latestScores={latestAnalysis?.scores}
        />
      </div>
    </div>
  );
}