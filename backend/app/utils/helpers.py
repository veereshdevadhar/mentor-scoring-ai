"""
Utility Helper Functions
"""

import uuid
from datetime import datetime
from typing import Optional


def generate_unique_id() -> str:
    """Generate unique ID for analysis"""
    return str(uuid.uuid4())


def generate_filename(original_filename: str, analysis_id: str) -> str:
    """
    Generate unique filename for uploaded video
    
    Args:
        original_filename: Original uploaded filename
        analysis_id: Unique analysis ID
        
    Returns:
        New filename with analysis ID
    """
    extension = original_filename.split('.')[-1].lower()
    return f"{analysis_id}.{extension}"


def validate_file_extension(filename: str, allowed_extensions: str) -> bool:
    """
    Validate file extension
    
    Args:
        filename: Filename to validate
        allowed_extensions: Comma-separated allowed extensions
        
    Returns:
        True if valid, False otherwise
    """
    if '.' not in filename:
        return False
    
    extension = filename.rsplit('.', 1)[1].lower()
    allowed = [ext.strip() for ext in allowed_extensions.split(',')]
    
    return extension in allowed


def format_duration(seconds: float) -> str:
    """
    Format duration in seconds to readable string
    
    Args:
        seconds: Duration in seconds
        
    Returns:
        Formatted string (e.g., "5m 30s")
    """
    minutes = int(seconds // 60)
    secs = int(seconds % 60)
    return f"{minutes}m {secs}s"


def calculate_file_size_mb(file_path: str) -> float:
    """
    Calculate file size in MB
    
    Args:
        file_path: Path to file
        
    Returns:
        File size in MB
    """
    import os
    if os.path.exists(file_path):
        size_bytes = os.path.getsize(file_path)
        return round(size_bytes / (1024 * 1024), 2)
    return 0.0


def get_score_rating(score: float) -> str:
    """
    Get rating label based on score
    
    Args:
        score: Score value (0-100)
        
    Returns:
        Rating label
    """
    if score >= 90:
        return "Excellent"
    elif score >= 80:
        return "Very Good"
    elif score >= 70:
        return "Good"
    elif score >= 60:
        return "Satisfactory"
    else:
        return "Needs Improvement"


def sanitize_input(text: str, max_length: int = 255) -> str:
    """
    Sanitize user input
    
    Args:
        text: Input text
        max_length: Maximum allowed length
        
    Returns:
        Sanitized text
    """
    # Remove leading/trailing whitespace
    text = text.strip()
    
    # Truncate to max length
    if len(text) > max_length:
        text = text[:max_length]
    
    # Remove potentially dangerous characters
    dangerous_chars = ['<', '>', '"', "'", '&', ';', '`']
    for char in dangerous_chars:
        text = text.replace(char, '')
    
    return text


def parse_timestamp(timestamp_str: Optional[str]) -> Optional[datetime]:
    """
    Parse timestamp string to datetime
    
    Args:
        timestamp_str: ISO format timestamp string
        
    Returns:
        datetime object or None
    """
    if not timestamp_str:
        return None
    
    try:
        return datetime.fromisoformat(timestamp_str.replace('Z', '+00:00'))
    except:
        return None