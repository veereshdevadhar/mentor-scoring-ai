"""
Configuration Settings
"""

from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    """Application settings"""
    
    # Application
    APP_NAME: str = "Mentor Scoring AI"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = True
    HOST: str = "0.0.0.0"
    PORT: int = 8000
    
    # MongoDB
    MONGODB_URL: str
    DATABASE_NAME: str = "mentor_scoring"
    
    # File Upload
    MAX_FILE_SIZE: int = 524288000  # 500MB
    UPLOAD_DIR: str = "uploads"
    ALLOWED_EXTENSIONS: str = "mp4,avi,mov,mkv,webm"
    
    # AI Models
    OLLAMA_BASE_URL: str = "http://localhost:11434"
    OLLAMA_MODEL: str = "llama3.1:8b"
    WHISPER_MODEL: str = "base"
    WHISPER_DEVICE: str = "cpu"
    
    # CORS
    CORS_ORIGINS: List[str] = ["http://localhost:5173", "http://localhost:3000"]
    
    # Security
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()