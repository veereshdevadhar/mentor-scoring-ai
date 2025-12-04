import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import LeaderboardCard from './LeaderboardCard';
import PerformanceChart from './PerformanceChart';
import RadarChart from './RadarChart';
import type { TopMentor } from '@/types/mentor';
import type { Scores } from '@/types/analysis';

interface ComparativeDashboardProps {
  topMentors: TopMentor[];
  performanceDistribution?: Array<{ name: string; value: number }>;
  latestScores?: Scores;
}

export default function ComparativeDashboard({ 
  topMentors, 
  performanceDistribution,
  latestScores 
}: ComparativeDashboardProps) {
  const defaultDistribution = [
    { name: 'Excellent (90+)', value: 2 },
    { name: 'Very Good (80-89)', value: 3 },
    { name: 'Good (70-79)', value: 4 },
    { name: 'Satisfactory (60-69)', value: 1 },
    { name: 'Needs Improvement (<60)', value: 0 },
  ];

  return (
    <div className="space-y-8">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Leaderboard */}
        <LeaderboardCard topMentors={topMentors} />

        {/* Performance Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <PerformanceChart data={performanceDistribution || defaultDistribution} />
          </CardContent>
        </Card>
      </div>

      {/* Radar Chart */}
      {latestScores && (
        <Card>
          <CardHeader>
            <CardTitle>Latest Analysis - Multi-Metric View</CardTitle>
          </CardHeader>
          <CardContent>
            <RadarChart scores={latestScores} />
          </CardContent>
        </Card>
      )}
    </div>
  );
}