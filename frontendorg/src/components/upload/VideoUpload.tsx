import { useState, useCallback } from 'react';
import { Upload, Video, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface VideoUploadProps {
  onFileSelect: (file: File | null) => void;
  selectedFile: File | null;
}

export default function VideoUpload({ onFileSelect, selectedFile }: VideoUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith('video/')) {
        handleFileChange(file);
      }
    },
    []
  );

  const handleFileChange = (file: File) => {
    onFileSelect(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileChange(file);
    }
  };

  const clearFile = () => {
    onFileSelect(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
  };

  return (
    <Card className="p-6">
      {!selectedFile ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`
            relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-12 transition-all
            ${isDragging 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
            }
          `}
        >
          <input
            type="file"
            accept="video/*"
            onChange={handleFileInput}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          
          <div className="flex flex-col items-center space-y-4">
            <div className="rounded-full bg-blue-100 p-6">
              <Upload className="h-12 w-12 text-blue-600" />
            </div>
            
            <div className="text-center">
              <p className="text-xl font-semibold text-gray-700">
                Drop your video here
              </p>
              <p className="text-sm text-gray-500 mt-2">
                or click to browse
              </p>
            </div>

            <div className="flex items-center space-x-2 text-xs text-gray-500">
              <Video className="h-4 w-4" />
              <span>MP4, WebM, AVI (Max 500MB)</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="rounded-lg bg-blue-100 p-3">
                <Video className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">{selectedFile.name}</p>
                <p className="text-sm text-gray-500">
                  {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={clearFile}
              className="text-gray-500 hover:text-red-600"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {previewUrl && (
            <video
              src={previewUrl}
              controls
              className="w-full max-h-64 rounded-lg bg-black"
            />
          )}
        </div>
      )}
    </Card>
  );
}