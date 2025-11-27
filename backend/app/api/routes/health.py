"""
Health Check Routes
"""

from fastapi import APIRouter
from app.core.database import get_database

router = APIRouter()


@router.get("")
async def health_check():
    """Basic health check"""
    return {
        "status": "healthy",
        "service": "Mentor Scoring AI Backend"
    }


@router.get("/db")
async def database_health():
    """Database health check"""
    try:
        db = get_database()
        await db.command("ping")
        return {
            "status": "healthy",
            "database": "connected"
        }
    except Exception as e:
        return {
            "status": "unhealthy",
            "database": "disconnected",
            "error": str(e)
        }