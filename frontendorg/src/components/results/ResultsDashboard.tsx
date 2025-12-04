import ScoreGauge from './ScoreGauge';
import MetricCard from './MetricCard';
import InsightsPanel from './InsightsPanel';
import { Card, CardContent } from '@/components/ui/card';
import type { Analysis } from '@/types/analysis';

interface ResultsDashboardProps {
  analysis: Analysis;
}

export default function ResultsDashboard({ analysis }: ResultsDashboardProps) {
  if (!analysis.scores || !analysis.insights) {
    return null;
  }

  const { scores, insights } = analysis;

  return (
    <div className="space-y-8">
      {/* Overall Score */}
      <Card className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white border-0">
        <CardContent className="p-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">Overall Teaching Score</h2>
            <ScoreGauge score={scores.overall} />
          </div>
        </CardContent>
      </Card>

      {/* Detailed Metrics */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">📊 Detailed Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <MetricCard
            title="Engagement"
            score={scores.engagement}
            icon="⚡"
            insight="Student attention and interaction during the session"
            color="yellow"
          />
          <MetricCard
            title="Communication"
            score={scores.communication}
            icon="💬"
            insight="Clarity and effectiveness of verbal communication"
            color="blue"
          />
          <MetricCard
            title="Technical Depth"
            score={scores.technical_depth}
            icon="🎯"
            insight="Subject expertise and content accuracy"
            color="purple"
          />
          <MetricCard
            title="Clarity"
            score={scores.clarity}
            icon="✨"
            insight="Structure and understandability of explanations"
            color="green"
          />
          <MetricCard
            title="Interaction"
            score={scores.interaction}
            icon="🤝"
            insight="Question handling and student participation"
            color="red"
          />
        </div>
      </div>

      {/* AI Insights */}
      <InsightsPanel insights={insights} />

      {/* Session Details */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">📋 Session Details</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Mentor</p>
              <p className="font-semibold">{analysis.mentor_name}</p>
            </div>
            <div>
              <p className="text-gray-500">Subject</p>
              <p className="font-semibold">{analysis.subject}</p>
            </div>
            <div>
              <p className="text-gray-500">Duration</p>
              <p className="font-semibold">
                {analysis.video_duration 
                  ? `${Math.floor(analysis.video_duration / 60)}m ${Math.floor(analysis.video_duration % 60)}s`
                  : 'N/A'
                }
              </p>
            </div>
            <div>
              <p className="text-gray-500">Analyzed</p>
              <p className="font-semibold">
                {new Date(analysis.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}