"""
Audio Analysis Service
Analyzes audio features using librosa and pydub
"""

import librosa
import numpy as np
import asyncio
from functools import partial
from typing import Dict


class AudioAnalyzer:
    """Analyze audio features from video"""
    
    async def analyze(self, video_path: str) -> Dict:
        """
        Analyze audio features
        
        Returns:
            Dictionary of audio features
        """
        loop = asyncio.get_event_loop()
        
        features = await loop.run_in_executor(
            None,
            self._extract_features,
            video_path
        )
        
        return features
    
    def _extract_features(self, video_path: str) -> Dict:
        """Extract audio features"""
        
        try:
            # Load audio
            y, sr = librosa.load(video_path, sr=22050, mono=True, duration=120)
            
            # Duration
            duration = librosa.get_duration(y=y, sr=sr)
            
            # Energy
            energy = librosa.feature.rms(y=y)[0]
            energy_mean = float(np.mean(energy))
            energy_std = float(np.std(energy))
            
            # Pitch
            pitches, magnitudes = librosa.piptrack(y=y, sr=sr)
            pitch_values = []
            for t in range(pitches.shape[1]):
                index = magnitudes[:, t].argmax()
                pitch = pitches[index, t]
                if pitch > 0:
                    pitch_values.append(pitch)
            
            pitch_mean = float(np.mean(pitch_values)) if pitch_values else 0
            pitch_std = float(np.std(pitch_values)) if pitch_values else 0
            
            # Speech rate estimation
            onset_env = librosa.onset.onset_strength(y=y, sr=sr)
            tempo = librosa.beat.tempo(onset_envelope=onset_env, sr=sr)[0]
            speech_rate = tempo * 1.5
            
            # Pause detection
            rms = librosa.feature.rms(y=y)[0]
            threshold = np.percentile(rms, 20)
            silent_frames = np.sum(rms < threshold)
            pause_ratio = silent_frames / len(rms)
            
            return {
                "duration": duration,
                "energy_mean": energy_mean,
                "energy_std": energy_std,
                "pitch_mean": pitch_mean,
                "pitch_std": pitch_std,
                "speech_rate": speech_rate,
                "pause_ratio": pause_ratio,
                "sample_rate": sr
            }
            
        except Exception as e:
            print(f"Audio analysis error: {e}")
            return {
                "duration": 0,
                "energy_mean": 0.5,
                "energy_std": 0.2,
                "pitch_mean": 180,
                "pitch_std": 50,
                "speech_rate": 150,
                "pause_ratio": 0.15,
                "sample_rate": 22050
            }