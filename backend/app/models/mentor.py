"""
Mentor Database Model
"""

from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
from bson import ObjectId


class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid ObjectId")
        return ObjectId(v)

    @classmethod
    def __get_pydantic_json_schema__(cls, field_schema):
        field_schema.update(type="string")


class MentorBase(BaseModel):
    """Base Mentor model"""
    name: str
    email: Optional[str] = None
    department: Optional[str] = None
    subject_expertise: Optional[str] = None


class MentorCreate(MentorBase):
    """Mentor creation model"""
    pass


class MentorInDB(MentorBase):
    """Mentor in database"""
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    total_sessions: int = 0
    average_score: float = 0.0
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    
    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}


class MentorResponse(BaseModel):
    """Mentor API response"""
    id: str
    name: str
    email: Optional[str] = None
    department: Optional[str] = None
    subject_expertise: Optional[str] = None
    total_sessions: int
    average_score: float
    created_at: datetime
    updated_at: datetime