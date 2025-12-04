import { useEffect, useState } from 'react';
import { Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

interface AnalysisProgressProps {
  status: 'pending' | 'processing' | 'completed' | 'failed';
}

export default function AnalysisProgress({ status }: AnalysisProgressProps) {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { name: 'Uploading video', icon: '📤' },
    { name: 'Extracting audio', icon: '🎤' },
    { name: 'Transcribing speech', icon: '📝' },
    { name: 'Analyzing visuals', icon: '👁️' },
    { name: 'Processing NLP', icon: '🤖' },
    { name: 'Calculating scores', icon: '🎯' },
    { name: 'Generating insights', icon: '✨' },
  ];

  useEffect(() => {
    if (status === 'processing') {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) return prev;
          return prev + Math.random() * 10;
        });
        setCurrentStep((prev) => {
          if (prev < steps.length - 1) return prev + 1;
          return prev;
        });
      }, 2000);

      return () => clearInterval(interval);
    } else if (status === 'completed') {
      setProgress(100);
      setCurrentStep(steps.length - 1);
    }
  }, [status]);

  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="text-2xl">🔍 AI Analysis in Progress</span>
          {status === 'processing' && (
            <Badge variant="default" className="animate-pulse">
              Processing
            </Badge>
          )}
          {status === 'completed' && (
            <Badge variant="secondary" className="bg-green-100 text-green-700">
              Completed
            </Badge>
          )}
          {status === 'failed' && (
            <Badge variant="destructive">Failed</Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-gray-700">
              {status === 'completed' ? 'Analysis Complete!' : steps[currentStep]?.name}
            </span>
            <span className="font-semibold text-blue-600">
              {Math.round(progress)}%
            </span>
          </div>
          <Progress value={progress} className="h-3" />
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`
                flex items-center space-x-3 rounded-lg p-3 transition-all
                ${index <= currentStep 
                  ? 'bg-blue-50 border-2 border-blue-200' 
                  : 'bg-gray-50 border-2 border-gray-200'
                }
              `}
            >
              <div className="text-2xl">{step.icon}</div>
              <div className="flex-1 min-w-0">
                <p className={`text-xs font-medium truncate ${
                  index <= currentStep ? 'text-blue-700' : 'text-gray-500'
                }`}>
                  {step.name}
                </p>
                {index < currentStep && (
                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-1" />
                )}
                {index === currentStep && status === 'processing' && (
                  <Loader2 className="h-4 w-4 text-blue-600 animate-spin mt-1" />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Status Messages */}
        {status === 'processing' && (
          <div className="rounded-lg bg-blue-50 border border-blue-200 p-4">
            <p className="text-sm text-blue-700">
              ⏳ This may take 1-2 minutes. Please don't close this window.
            </p>
          </div>
        )}

        {status === 'completed' && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-4">
            <p className="text-sm text-green-700 flex items-center">
              <CheckCircle2 className="h-5 w-5 mr-2" />
              Analysis completed successfully! Scroll down to view results.
            </p>
          </div>
        )}

        {status === 'failed' && (
          <div className="rounded-lg bg-red-50 border border-red-200 p-4">
            <p className="text-sm text-red-700 flex items-center">
              <XCircle className="h-5 w-5 mr-2" />
              Analysis failed. Please try uploading again.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}