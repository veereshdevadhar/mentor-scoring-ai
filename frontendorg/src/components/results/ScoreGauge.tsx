interface ScoreGaugeProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
}

export default function ScoreGauge({ score, size = 'lg' }: ScoreGaugeProps) {
  const sizeClasses = {
    sm: 'w-32 h-32',
    md: 'w-40 h-40',
    lg: 'w-56 h-56',
  };

  const getColor = (score: number) => {
    if (score >= 90) return '#10b981'; // green
    if (score >= 80) return '#3b82f6'; // blue
    if (score >= 70) return '#f59e0b'; // orange
    if (score >= 60) return '#f97316'; // orange-red
    return '#ef4444'; // red
  };

  const getRating = (score: number) => {
    if (score >= 90) return 'Excellent';
    if (score >= 80) return 'Very Good';
    if (score >= 70) return 'Good';
    if (score >= 60) return 'Satisfactory';
    return 'Needs Improvement';
  };

  const circumference = 2 * Math.PI * 70;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className={`relative ${sizeClasses[size]}`}>
        <svg className="w-full h-full transform -rotate-90">
          {/* Background circle */}
          <circle
            cx="50%"
            cy="50%"
            r="70"
            stroke="#e5e7eb"
            strokeWidth="12"
            fill="none"
          />
          {/* Progress circle */}
          <circle
            cx="50%"
            cy="50%"
            r="70"
            stroke={getColor(score)}
            strokeWidth="12"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        
        {/* Score text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-5xl font-bold" style={{ color: getColor(score) }}>
            {score}
          </div>
          <div className="text-sm text-gray-500 mt-1">out of 100</div>
        </div>
      </div>
      
      <div className="mt-4 px-4 py-2 rounded-full bg-gray-100">
        <span className="text-sm font-semibold text-gray-700">
          {getRating(score)}
        </span>
      </div>
    </div>
  );
}