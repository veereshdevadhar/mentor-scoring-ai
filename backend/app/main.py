"""
FastAPI Main Application
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from contextlib import asynccontextmanager
import os

from app.core.config import settings
from app.core.database import connect_to_mongo, close_mongo_connection
from app.api.routes import analysis, mentors, health


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Startup and shutdown events"""
    # Startup
    await connect_to_mongo()
    print("✅ Connected to MongoDB")
    
    # Create upload directories
    os.makedirs(settings.UPLOAD_DIR, exist_ok=True)
    os.makedirs(f"{settings.UPLOAD_DIR}/videos", exist_ok=True)
    os.makedirs(f"{settings.UPLOAD_DIR}/audio", exist_ok=True)
    os.makedirs(f"{settings.UPLOAD_DIR}/temp", exist_ok=True)
    print("✅ Upload directories created")
    
    yield
    
    # Shutdown
    await close_mongo_connection()
    print("✅ Closed MongoDB connection")


# Initialize FastAPI app
app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description="AI-powered mentor evaluation system",
    lifespan=lifespan
)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount static files
app.mount("/uploads", StaticFiles(directory=settings.UPLOAD_DIR), name="uploads")

# Include routers
app.include_router(health.router, prefix="/api/health", tags=["Health"])
app.include_router(analysis.router, prefix="/api/analysis", tags=["Analysis"])
app.include_router(mentors.router, prefix="/api/mentors", tags=["Mentors"])


@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "Mentor Scoring AI - Backend API",
        "version": settings.APP_VERSION,
        "status": "running",
        "docs": "/docs",
        "health": "/api/health"
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main:app",
        host=settings.HOST,
        port=settings.PORT,
        reload=settings.DEBUG
    )