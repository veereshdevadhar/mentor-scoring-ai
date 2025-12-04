import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';

interface MetricCardProps {
  title: string;
  score: number;
  icon: string;
  insight: string;
  color: string;
}

export default function MetricCard({ title, score, icon, insight, color }: MetricCardProps) {
  const getGradient = (color: string) => {
    const gradients: Record<string, string> = {
      yellow: 'from-yellow-400 to-orange-500',
      blue: 'from-blue-400 to-cyan-500',
      purple: 'from-purple-400 to-pink-500',
      green: 'from-green-400 to-emerald-500',
      red: 'from-red-400 to-rose-500',
      teal: 'from-teal-400 to-cyan-500',
    };
    return gradients[color] || gradients.blue;
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <span className="text-3xl">{icon}</span>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-baseline">
            <span className="text-sm text-gray-600">Score</span>
            <span className="text-2xl font-bold text-blue-600">{score}/100</span>
          </div>

          <div className="relative">
            <Progress value={score} className="h-3" />
            <div
              className={`absolute top-0 left-0 h-3 rounded-full bg-gradient-to-r ${getGradient(color)} transition-all duration-1000`}
              style={{ width: `${score}%` }}
            />
          </div>

          <p className="text-sm text-gray-600 mt-3 leading-relaxed">
            {insight}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}