"""
Mentor API Schemas
"""

from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime


class MentorStatsResponse(BaseModel):
    """Mentor statistics response"""
    id: str
    mentor_name: str
    total_sessions: int
    average_score: float
    last_session: Optional[datetime] = None


class MentorListResponse(BaseModel):
    """List of mentors response"""
    mentors: List[MentorStatsResponse]


class TopMentorResponse(BaseModel):
    """Top mentor response"""
    rank: int
    id: str
    mentor_name: str
    average_score: float
    total_sessions: int


class TopMentorsListResponse(BaseModel):
    """List of top mentors response"""
    top_mentors: List[TopMentorResponse]


class MentorDetailResponse(BaseModel):
    """Detailed mentor information"""
    mentor_id: str
    mentor_name: str
    total_sessions: int
    completed_sessions: int
    average_score: float
    highest_score: float
    lowest_score: float
    recent_analyses: List[dict]