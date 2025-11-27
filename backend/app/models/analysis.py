"""
Analysis Database Model
"""

from pydantic import BaseModel, Field
from typing import Optional, Dict, List
from datetime import datetime
from enum import Enum


class AnalysisStatus(str, Enum):
    """Analysis status enum"""
    PENDING = "pending"
    PROCESSING = "processing"
    COMPLETED = "completed"
    FAILED = "failed"


class Scores(BaseModel):
    """Evaluation scores"""
    engagement: float = Field(ge=0, le=100)
    communication: float = Field(ge=0, le=100)
    technical_depth: float = Field(ge=0, le=100)
    clarity: float = Field(ge=0, le=100)
    interaction: float = Field(ge=0, le=100)
    overall: float = Field(ge=0, le=100)


class Insights(BaseModel):
    """AI-generated insights"""
    strengths: List[str] = []
    improvements: List[str] = []
    recommendations: List[str] = []
    key_highlights: Optional[str] = None


class AnalysisBase(BaseModel):
    """Base analysis model"""
    mentor_id: str
    mentor_name: str
    subject: str
    video_filename: str
    video_duration: Optional[float] = None


class AnalysisCreate(AnalysisBase):
    """Analysis creation model"""
    pass


class AnalysisInDB(AnalysisBase):
    """Analysis in database"""
    id: str = Field(alias="_id")
    status: AnalysisStatus = AnalysisStatus.PENDING
    scores: Optional[Scores] = None
    insights: Optional[Insights] = None
    transcript: Optional[str] = None
    
    # AI Pipeline Data
    audio_features: Optional[Dict] = None
    visual_features: Optional[Dict] = None
    nlp_analysis: Optional[Dict] = None
    
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    completed_at: Optional[datetime] = None
    
    class Config:
        populate_by_name = True


class AnalysisResponse(BaseModel):
    """Analysis API response"""
    id: str
    mentor_id: str
    mentor_name: str
    subject: str
    video_filename: str
    video_duration: Optional[float] = None
    status: AnalysisStatus
    scores: Optional[Scores] = None
    insights: Optional[Insights] = None
    created_at: datetime
    updated_at: datetime