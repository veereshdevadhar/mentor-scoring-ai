import { X, TrendingUp, TrendingDown, Award, Calendar, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { MentorDetail } from '@/types/mentor';

interface MentorDetailsModalProps {
  mentor: MentorDetail | null;
  isOpen: boolean;
  onClose: () => void;
  loading?: boolean;
}

export default function MentorDetailsModal({ mentor, isOpen, onClose, loading }: MentorDetailsModalProps) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading mentor details...</p>
          </div>
        ) : mentor ? (
          <>
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-t-lg flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">{mentor.mentor_name}</h2>
                <p className="text-blue-100 text-sm mt-1">Mentor ID: {mentor.mentor_id}</p>
              </div>
              <button
                onClick={onClose}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Overview Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Total Sessions</p>
                        <p className="text-2xl font-bold text-blue-700">{mentor.total_sessions}</p>
                      </div>
                      <Calendar className="h-8 w-8 text-blue-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Completed</p>
                        <p className="text-2xl font-bold text-green-700">{mentor.completed_sessions}</p>
                      </div>
                      <Award className="h-8 w-8 text-green-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Average Score</p>
                        <p className="text-2xl font-bold text-purple-700">{mentor.average_score}</p>
                      </div>
                      <BarChart3 className="h-8 w-8 text-purple-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Highest Score</p>
                        <p className="text-2xl font-bold text-amber-700">{mentor.highest_score}</p>
                      </div>
                      <TrendingUp className="h-8 w-8 text-amber-500" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Score Range */}
              <Card>
                <CardHeader>
                  <CardTitle>Score Range</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <TrendingDown className="h-5 w-5 text-red-500" />
                      <span className="text-gray-600">Lowest Score:</span>
                      <Badge variant="outline" className="text-red-600 border-red-300">
                        {mentor.lowest_score}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-5 w-5 text-green-500" />
                      <span className="text-gray-600">Highest Score:</span>
                      <Badge variant="outline" className="text-green-600 border-green-300">
                        {mentor.highest_score}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Analyses */}
              {mentor.recent_analyses && mentor.recent_analyses.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Sessions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {mentor.recent_analyses.map((analysis: any) => (
                        <div
                          key={analysis.id}
                          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <p className="font-semibold text-gray-900">{analysis.subject || 'N/A'}</p>
                              <Badge 
                                variant="outline"
                                className={
                                  analysis.status === 'completed' 
                                    ? 'text-green-600 border-green-300' 
                                    : analysis.status === 'processing'
                                    ? 'text-yellow-600 border-yellow-300'
                                    : 'text-gray-600 border-gray-300'
                                }
                              >
                                {analysis.status}
                              </Badge>
                            </div>
                            {analysis.scores && (
                              <div className="flex items-center space-x-4 text-sm">
                                <span className="text-gray-600">
                                  Overall: <span className="font-semibold text-blue-600">{analysis.scores.overall}</span>
                                </span>
                                <span className="text-gray-600">
                                  Engagement: <span className="font-semibold">{analysis.scores.engagement}</span>
                                </span>
                                <span className="text-gray-600">
                                  Communication: <span className="font-semibold">{analysis.scores.communication}</span>
                                </span>
                              </div>
                            )}
                            {analysis.created_at && (
                              <p className="text-xs text-gray-500 mt-2">
                                {new Date(analysis.created_at).toLocaleString()}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </>
        ) : (
          <div className="p-8 text-center">
            <p className="text-gray-600">No mentor details available</p>
          </div>
        )}
      </div>
    </div>
  );
}

