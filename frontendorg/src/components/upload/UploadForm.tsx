import { useState } from 'react';
import { Loader2, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import VideoUpload from './VideoUpload';
import analysisService from '@/services/analysisService';

interface UploadFormProps {
  onUploadSuccess: (analysisId: string) => void;
}

export default function UploadForm({ onUploadSuccess }: UploadFormProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [mentorName, setMentorName] = useState('');
  const [subject, setSubject] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFile || !mentorName || !subject) {
      setError('Please fill in all fields and select a video');
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      const response = await analysisService.uploadVideo({
        video: selectedFile,
        mentor_name: mentorName,
        subject: subject,
      });

      onUploadSuccess(response.analysis_id);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const isFormValid = selectedFile && mentorName.trim() && subject.trim();

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="text-2xl">📹 Upload Teaching Session</CardTitle>
          <CardDescription>
            Upload a recorded video of a teaching session for AI-powered evaluation
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Video Upload */}
          <VideoUpload
            selectedFile={selectedFile}
            onFileSelect={setSelectedFile}
          />

          {/* Mentor Details */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Mentor Name *
              </label>
              <input
                type="text"
                value={mentorName}
                onChange={(e) => setMentorName(e.target.value)}
                placeholder="Enter mentor name"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Subject/Topic *
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g., Machine Learning, Data Structures"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                required
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="rounded-lg bg-red-50 border border-red-200 p-4">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={!isFormValid || isUploading}
            className="w-full h-12 text-base font-semibold"
            size="lg"
          >
            {isUploading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Uploading & Analyzing...
              </>
            ) : (
              <>
                <Rocket className="mr-2 h-5 w-5" />
                Start AI Analysis
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </form>
  );
}