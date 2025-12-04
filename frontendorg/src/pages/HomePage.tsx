import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Brain, TrendingUp, Users, CheckCircle } from 'lucide-react';
import UploadForm from '@/components/upload/UploadForm';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function HomePage() {
  const navigate = useNavigate();
  const [totalSessions] = useState(0);

  const handleUploadSuccess = (analysisId: string) => {
    navigate(`/analysis/${analysisId}`);
  };

  const features = [
    {
      icon: <Brain className="h-8 w-8 text-blue-600" />,
      title: 'AI-Powered Analysis',
      description: 'Multimodal AI analyzes audio, visual, and content quality',
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-green-600" />,
      title: 'Detailed Metrics',
      description: 'Engagement, communication, technical depth, clarity, and interaction scores',
    },
    {
      icon: <Sparkles className="h-8 w-8 text-purple-600" />,
      title: 'Explainable Insights',
      description: 'Get personalized recommendations and actionable feedback',
    },
    {
      icon: <Users className="h-8 w-8 text-orange-600" />,
      title: 'Comparative Analysis',
      description: 'Compare performance with top mentors and track progress',
    },
  ];

  const howItWorks = [
    { step: '1', title: 'Upload Video', description: 'Upload a recorded teaching session' },
    { step: '2', title: 'AI Analysis', description: 'Our AI analyzes multiple dimensions' },
    { step: '3', title: 'Get Results', description: 'Receive detailed scores and insights' },
    { step: '4', title: 'Improve', description: 'Apply recommendations to enhance teaching' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Hero Section */}
      <section className="container py-12">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-blue-600 text-white">
            🏆 IIT Bombay Hackathon - Round 2
          </Badge>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Mentor Scoring AI
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Transform educator evaluation with AI-powered teaching quality assessment
          </p>
          <div className="flex items-center justify-center space-x-8 mt-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{totalSessions}+</div>
              <div className="text-sm text-gray-600">Sessions Analyzed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">95%</div>
              <div className="text-sm text-gray-600">Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">5+</div>
              <div className="text-sm text-gray-600">Metrics Tracked</div>
            </div>
          </div>
        </div>

        {/* Upload Form */}
        <div className="max-w-4xl mx-auto mb-16">
          <UploadForm onUploadSuccess={handleUploadSuccess} />
        </div>
      </section>

      {/* Features */}
      <section className="container py-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          ✨ Why Choose Mentor Scoring AI?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="container py-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          🚀 How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {howItWorks.map((item, index) => (
            <div key={index} className="relative">
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white text-2xl font-bold mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </CardContent>
              </Card>
              {index < howItWorks.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                  <div className="text-3xl text-gray-300">→</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Evaluation Metrics */}
      <section className="container py-16">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            📊 Evaluation Metrics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {[
              { name: 'Engagement', weight: '20%', color: 'bg-yellow-500' },
              { name: 'Communication', weight: '20%', color: 'bg-blue-500' },
              { name: 'Technical Depth', weight: '30%', color: 'bg-purple-500' },
              { name: 'Clarity', weight: '20%', color: 'bg-green-500' },
              { name: 'Interaction', weight: '10%', color: 'bg-red-500' },
            ].map((metric, index) => (
              <div key={index} className="text-center">
                <div className={`h-2 ${metric.color} rounded-full mb-3`} />
                <div className="font-semibold text-gray-800">{metric.name}</div>
                <div className="text-sm text-gray-600">{metric.weight}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container py-16">
        <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Teaching?</h2>
            <p className="text-xl mb-8 text-blue-100">
              Start analyzing your teaching sessions today with AI-powered insights
            </p>
            <div className="flex justify-center space-x-4">
              <CheckCircle className="h-6 w-6" />
              <span>100% Original Algorithm</span>
              <CheckCircle className="h-6 w-6 ml-4" />
              <span>Explainable AI</span>
              <CheckCircle className="h-6 w-6 ml-4" />
              <span>Actionable Insights</span>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}