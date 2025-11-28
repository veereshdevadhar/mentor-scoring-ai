"""
Video Processing Orchestrator
Coordinates all AI pipeline components
"""

import asyncio
from typing import Dict

from app.services.ai_pipeline.whisper_transcription import WhisperTranscriber
from app.services.ai_pipeline.audio_analysis import AudioAnalyzer
from app.services.ai_pipeline.mediapipe_analysis import MediaPipeAnalyzer
from app.services.ai_pipeline.llama_scoring import LlamaScorer


class VideoProcessor:
    """Orchestrates video analysis pipeline"""
    
    def __init__(self, video_path: str):
        self.video_path = video_path
        self.transcriber = WhisperTranscriber()
        self.audio_analyzer = AudioAnalyzer()
        self.visual_analyzer = MediaPipeAnalyzer()
        self.llama_scorer = LlamaScorer()
    
    async def process(self) -> Dict:
        """Run complete analysis pipeline"""
        results = {}
        
        # Run analyses in parallel
        tasks = [
            self._run_transcription(),
            self._run_audio_analysis(),
            self._run_visual_analysis()
        ]
        
        transcript, audio_features, visual_features = await asyncio.gather(*tasks)
        
        results["transcript"] = transcript
        results["audio_features"] = audio_features
        results["visual_features"] = visual_features
        
        # Run NLP analysis
        if transcript:
            nlp_results = await self._run_nlp_analysis(transcript)
            results["nlp_analysis"] = nlp_results
        
        results["duration"] = audio_features.get("duration", 0)
        
        return results
    
    async def _run_transcription(self) -> str:
        """Transcribe audio using Whisper"""
        try:
            return await self.transcriber.transcribe(self.video_path)
        except Exception as e:
            print(f"Transcription error: {e}")
            return ""
    
    async def _run_audio_analysis(self) -> Dict:
        """Analyze audio features"""
        try:
            return await self.audio_analyzer.analyze(self.video_path)
        except Exception as e:
            print(f"Audio analysis error: {e}")
            return {}
    
    async def _run_visual_analysis(self) -> Dict:
        """Analyze visual features"""
        try:
            return await self.visual_analyzer.analyze(self.video_path)
        except Exception as e:
            print(f"Visual analysis error: {e}")
            return {}
    
    async def _run_nlp_analysis(self, transcript: str) -> Dict:
        """Analyze transcript with LLaMA"""
        try:
            return await self.llama_scorer.analyze_transcript(transcript)
        except Exception as e:
            print(f"NLP analysis error: {e}")
            return {}