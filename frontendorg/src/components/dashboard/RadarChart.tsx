import { RadarChart as RechartsRadar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';
import type { Scores } from '@/types/analysis';

interface RadarChartProps {
  scores: Scores;
}

export default function RadarChart({ scores }: RadarChartProps) {
  const data = [
    { metric: 'Engagement', value: scores.engagement },
    { metric: 'Communication', value: scores.communication },
    { metric: 'Technical Depth', value: scores.technical_depth },
    { metric: 'Clarity', value: scores.clarity },
    { metric: 'Interaction', value: scores.interaction },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsRadar data={data}>
        <PolarGrid stroke="#e5e7eb" />
        <PolarAngleAxis 
          dataKey="metric" 
          tick={{ fill: '#6b7280', fontSize: 12 }}
        />
        <PolarRadiusAxis angle={90} domain={[0, 100]} />
        <Radar
          name="Scores"
          dataKey="value"
          stroke="#3b82f6"
          fill="#3b82f6"
          fillOpacity={0.6}
        />
      </RechartsRadar>
    </ResponsiveContainer>
  );
}