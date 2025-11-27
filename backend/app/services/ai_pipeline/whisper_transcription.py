"""
Whisper Transcription Service
Uses OpenAI Whisper for speech-to-text
"""

import whisper
import asyncio
from functools import partial
from app.core.config import settings


class WhisperTranscriber:
    """Transcribe audio using Whisper model"""
    
    def __init__(self):
        self.model = None
        self.model_name = settings.WHISPER_MODEL
    
    def _load_model(self):
        """Load Whisper model (lazy loading)"""
        if self.model is None:
            self.model = whisper.load_model(self.model_name)
    
    async def transcribe(self, video_path: str) -> str:
        """
        Transcribe video audio
        
        Args:
            video_path: Path to video file
            
        Returns:
            Transcribed text
        """
        self._load_model()
        
        # Run transcription in thread pool (CPU-intensive)
        loop = asyncio.get_event_loop()
        result = await loop.run_in_executor(
            None,
            partial(self.model.transcribe, video_path)
        )
        
        return result["text"]