"""
File Handling Utilities
"""

import os
import shutil
from typing import Optional
from pathlib import Path


class FileHandler:
    """Handle file operations for video uploads"""
    
    def __init__(self, upload_dir: str):
        self.upload_dir = upload_dir
        self.videos_dir = os.path.join(upload_dir, "videos")
        self.audio_dir = os.path.join(upload_dir, "audio")
        self.temp_dir = os.path.join(upload_dir, "temp")
    
    def ensure_directories_exist(self):
        """Create upload directories if they don't exist"""
        os.makedirs(self.videos_dir, exist_ok=True)
        os.makedirs(self.audio_dir, exist_ok=True)
        os.makedirs(self.temp_dir, exist_ok=True)
    
    def save_uploaded_file(self, file_content: bytes, filename: str) -> str:
        """
        Save uploaded file to videos directory
        
        Args:
            file_content: File content as bytes
            filename: Filename to save as
            
        Returns:
            Full path to saved file
        """
        filepath = os.path.join(self.videos_dir, filename)
        
        with open(filepath, 'wb') as f:
            f.write(file_content)
        
        return filepath
    
    def delete_file(self, filepath: str) -> bool:
        """
        Delete a file
        
        Args:
            filepath: Path to file to delete
            
        Returns:
            True if successful, False otherwise
        """
        try:
            if os.path.exists(filepath):
                os.remove(filepath)
                return True
            return False
        except Exception as e:
            print(f"Error deleting file {filepath}: {e}")
            return False
    
    def get_file_info(self, filepath: str) -> Optional[dict]:
        """
        Get file information
        
        Args:
            filepath: Path to file
            
        Returns:
            Dictionary with file info or None
        """
        if not os.path.exists(filepath):
            return None
        
        stat = os.stat(filepath)
        
        return {
            "path": filepath,
            "size_bytes": stat.st_size,
            "size_mb": round(stat.st_size / (1024 * 1024), 2),
            "created_at": stat.st_ctime,
            "modified_at": stat.st_mtime
        }
    
    def cleanup_old_files(self, days: int = 7):
        """
        Delete files older than specified days
        
        Args:
            days: Number of days threshold
        """
        import time
        
        current_time = time.time()
        threshold = days * 24 * 60 * 60
        
        for directory in [self.videos_dir, self.audio_dir, self.temp_dir]:
            for filename in os.listdir(directory):
                filepath = os.path.join(directory, filename)
                
                if os.path.isfile(filepath):
                    file_age = current_time - os.path.getmtime(filepath)
                    
                    if file_age > threshold:
                        self.delete_file(filepath)
                        print(f"Deleted old file: {filename}")
    
    def get_storage_usage(self) -> dict:
        """
        Get storage usage statistics
        
        Returns:
            Dictionary with storage stats
        """
        def get_directory_size(directory: str) -> int:
            total_size = 0
            for dirpath, dirnames, filenames in os.walk(directory):
                for filename in filenames:
                    filepath = os.path.join(dirpath, filename)
                    if os.path.exists(filepath):
                        total_size += os.path.getsize(filepath)
            return total_size
        
        videos_size = get_directory_size(self.videos_dir)
        audio_size = get_directory_size(self.audio_dir)
        temp_size = get_directory_size(self.temp_dir)
        total_size = videos_size + audio_size + temp_size
        
        return {
            "videos_mb": round(videos_size / (1024 * 1024), 2),
            "audio_mb": round(audio_size / (1024 * 1024), 2),
            "temp_mb": round(temp_size / (1024 * 1024), 2),
            "total_mb": round(total_size / (1024 * 1024), 2),
            "total_gb": round(total_size / (1024 * 1024 * 1024), 2)
        }