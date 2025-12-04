import { useState } from 'react';
import { Trophy, Medal, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { TopMentor } from '@/types/mentor';
import MentorDetailsModal from './MentorDetailsModal';
import { useMentorDetails } from '@/hooks/useMentors';

interface LeaderboardCardProps {
  topMentors: TopMentor[];
}

export default function LeaderboardCard({ topMentors }: LeaderboardCardProps) {
  const [selectedMentorId, setSelectedMentorId] = useState<string | null>(null);
  const { mentorDetails, loading } = useMentorDetails(selectedMentorId);

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="h-6 w-6 text-yellow-500" />;
    if (rank === 2) return <Medal className="h-6 w-6 text-gray-400" />;
    if (rank === 3) return <Award className="h-6 w-6 text-amber-600" />;
    return <span className="text-lg font-bold text-gray-400">#{rank}</span>;
  };

  const handleMentorClick = (mentorId: string) => {
    setSelectedMentorId(mentorId);
  };

  const handleCloseModal = () => {
    setSelectedMentorId(null);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Trophy className="h-6 w-6 text-yellow-500" />
            <span>Top Performing Mentors</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {topMentors.length > 0 ? (
              topMentors.map((mentor) => (
                <div
                  key={mentor.id}
                  onClick={() => handleMentorClick(mentor.id)}
                  className={`
                    flex items-center justify-between p-4 rounded-lg transition-all cursor-pointer
                    ${mentor.rank === 1 
                      ? 'bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-400 hover:shadow-md' 
                      : 'bg-gray-50 hover:bg-gray-100 hover:shadow-sm'
                    }
                  `}
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      {getRankIcon(mentor.rank)}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        {mentor.mentor_name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {mentor.total_sessions} sessions
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">
                      {mentor.average_score}
                    </div>
                    <div className="text-xs text-gray-500">score</div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 py-8">
                No data available yet
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      <MentorDetailsModal
        mentor={mentorDetails}
        isOpen={selectedMentorId !== null}
        onClose={handleCloseModal}
        loading={loading}
      />
    </>
  );
}