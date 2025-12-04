import { CheckCircle, TrendingUp, Lightbulb, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Insights } from '@/types/analysis';

interface InsightsPanelProps {
  insights: Insights;
}

export default function InsightsPanel({ insights }: InsightsPanelProps) {
  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle className="text-2xl">🧠 AI-Generated Insights</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Strengths */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <h3 className="text-lg font-semibold text-green-700">Strengths</h3>
            </div>
            <div className="space-y-2">
              {insights.strengths.length > 0 ? (
                insights.strengths.map((strength, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-2 p-3 rounded-lg bg-green-50 border border-green-200"
                  >
                    <Star className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-green-800">{strength}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">No specific strengths identified yet.</p>
              )}
            </div>
          </div>

          {/* Improvements */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-orange-600" />
              <h3 className="text-lg font-semibold text-orange-700">Areas for Improvement</h3>
            </div>
            <div className="space-y-2">
              {insights.improvements.length > 0 ? (
                insights.improvements.map((improvement, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-2 p-3 rounded-lg bg-orange-50 border border-orange-200"
                  >
                    <TrendingUp className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-orange-800">{improvement}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">Great performance across all areas!</p>
              )}
            </div>
          </div>
        </div>

        {/* Recommendations */}
        {insights.recommendations.length > 0 && (
          <div className="mt-6 p-4 rounded-lg bg-blue-50 border-l-4 border-blue-500">
            <div className="flex items-center space-x-2 mb-3">
              <Lightbulb className="h-5 w-5 text-blue-600" />
              <h4 className="font-semibold text-blue-900">Personalized Recommendations</h4>
            </div>
            <ul className="space-y-2">
              {insights.recommendations.map((rec, index) => (
                <li key={index} className="text-sm text-blue-800 flex items-start">
                  <span className="mr-2">•</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Key Highlights */}
        {insights.key_highlights && (
          <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200">
            <Badge className="mb-2 bg-indigo-600">Overall Assessment</Badge>
            <p className="text-sm text-indigo-900 font-medium">
              {insights.key_highlights}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}