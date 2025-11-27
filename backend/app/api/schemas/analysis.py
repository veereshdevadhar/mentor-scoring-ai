"""
Analysis API Schemas
"""

from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime


class AnalysisUploadRequest(BaseModel):
    """Request schema for video upload"""
    mentor_name: str = Field(..., min_length=2, max_length=100)
    subject: str = Field(..., min_length=2, max_length=100)
    mentor_id: Optional[str] = None


class ScoresResponse(BaseModel):
    """Scores response schema"""
    engagement: float
    communication: float
    technical_depth: float
    clarity: float
    interaction: float
    overall: float


class InsightsResponse(BaseModel):
    """Insights response schema"""
    strengths: List[str]
    improvements: List[str]
    recommendations: List[str]
    key_highlights: Optional[str] = None


class AnalysisStatusResponse(BaseModel):
    """Analysis status response"""
    analysis_id: str
    status: str
    message: Optional[str] = None
    created_at: datetime


class AnalysisResultResponse(BaseModel):
    """Complete analysis result response"""
    id: str
    mentor_id: str
    mentor_name: str
    subject: str
    video_filename: str
    video_duration: Optional[float] = None
    status: str
    scores: Optional[ScoresResponse] = None
    insights: Optional[InsightsResponse] = None
    transcript: Optional[str] = None
    created_at: datetime
    updated_at: datetime
    completed_at: Optional[datetime] = None


class AnalysisListResponse(BaseModel):
    """List of analyses response"""
    analyses: List[AnalysisResultResponse]
    total: int
    skip: int
    limit: int