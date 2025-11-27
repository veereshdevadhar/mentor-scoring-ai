"""
LLaMA NLP Scoring Service
Uses LLaMA 3.1 via Ollama for NLP analysis
"""

import ollama
import asyncio
import re
from typing import Dict
from app.core.config import settings


class LlamaScorer:
    """Analyze transcript using LLaMA 3.1"""
    
    def __init__(self):
        self.model = settings.OLLAMA_MODEL
        self.client = ollama.AsyncClient(host=settings.OLLAMA_BASE_URL)
    
    async def analyze_transcript(self, transcript: str) -> Dict:
        """
        Analyze transcript for technical depth, clarity, etc.
        
        Args:
            transcript: Transcribed text
            
        Returns:
            NLP analysis results
        """
        
        if not transcript or len(transcript) < 50:
            return self._default_analysis()
        
        try:
            # Analyze different aspects
            tasks = [
                self._analyze_technical_depth(transcript),
                self._analyze_clarity(transcript),
                self._analyze_structure(transcript)
            ]
            
            technical, clarity, structure = await asyncio.gather(*tasks)
            
            # Count questions
            question_count = len(re.findall(r'\?', transcript))
            
            # Count technical terms
            technical_terms = self._count_technical_terms(transcript)
            
            return {
                "technical_depth_score": technical,
                "clarity_score": clarity,
                "structure_score": structure,
                "question_count": question_count,
                "technical_term_count": technical_terms,
                "word_count": len(transcript.split())
            }
            
        except Exception as e:
            print(f"LLaMA analysis error: {e}")
            return self._default_analysis()
    
    async def _analyze_technical_depth(self, transcript: str) -> float:
        """Analyze technical depth using LLaMA"""
        
        prompt = f"""Analyze the following teaching transcript for technical depth.
Rate the technical depth on a scale of 0.0 to 1.0, where:
- 0.0-0.3: Very basic, no technical content
- 0.4-0.6: Moderate technical content
- 0.7-1.0: Deep technical content with detailed explanations

Respond with ONLY a number between 0.0 and 1.0.

Transcript: {transcript[:1000]}

Technical Depth Score:"""
        
        try:
            response = await self.client.generate(
                model=self.model,
                prompt=prompt,
                options={'temperature': 0.3, 'num_predict': 10}
            )
            
            score_text = response['response'].strip()
            score = float(re.findall(r'0\.\d+|1\.0', score_text)[0])
            return min(1.0, max(0.0, score))
            
        except:
            return 0.6
    
    async def _analyze_clarity(self, transcript: str) -> float:
        """Analyze clarity using LLaMA"""
        
        prompt = f"""Analyze the following teaching transcript for clarity of explanation.
Rate the clarity on a scale of 0.0 to 1.0, where:
- 0.0-0.3: Confusing, unclear
- 0.4-0.6: Moderately clear
- 0.7-1.0: Very clear and well-structured

Respond with ONLY a number between 0.0 and 1.0.

Transcript: {transcript[:1000]}

Clarity Score:"""
        
        try:
            response = await self.client.generate(
                model=self.model,
                prompt=prompt,
                options={'temperature': 0.3, 'num_predict': 10}
            )
            
            score_text = response['response'].strip()
            score = float(re.findall(r'0\.\d+|1\.0', score_text)[0])
            return min(1.0, max(0.0, score))
            
        except:
            return 0.7
    
    async def _analyze_structure(self, transcript: str) -> float:
        """Analyze structure using LLaMA"""
        
        prompt = f"""Analyze the following teaching transcript for structure and organization.
Rate the structure on a scale of 0.0 to 1.0, where:
- 0.0-0.3: Poorly organized
- 0.4-0.6: Moderately organized
- 0.7-1.0: Well-organized with clear flow

Respond with ONLY a number between 0.0 and 1.0.

Transcript: {transcript[:1000]}

Structure Score:"""
        
        try:
            response = await self.client.generate(
                model=self.model,
                prompt=prompt,
                options={'temperature': 0.3, 'num_predict': 10}
            )
            
            score_text = response['response'].strip()
            score = float(re.findall(r'0\.\d+|1\.0', score_text)[0])
            return min(1.0, max(0.0, score))
            
        except:
            return 0.65
    
    def _count_technical_terms(self, transcript: str) -> int:
        """Count technical terms in transcript"""
        
        technical_patterns = [
            r'\b(?:algorithm|function|variable|class|object|method|parameter)\b',
            r'\b(?:database|query|server|client|API|protocol)\b',
            r'\b(?:machine learning|neural network|deep learning|AI)\b',
            r'\b(?:data structure|complexity|optimization|efficiency)\b',
        ]
        
        count = 0
        for pattern in technical_patterns:
            count += len(re.findall(pattern, transcript, re.IGNORECASE))
        
        return count
    
    def _default_analysis(self) -> Dict:
        """Return default analysis"""
        return {
            "technical_depth_score": 0.6,
            "clarity_score": 0.7,
            "structure_score": 0.65,
            "question_count": 3,
            "technical_term_count": 5,
            "word_count": 0
        }