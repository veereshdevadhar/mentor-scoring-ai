"""
Analysis API Routes
"""

from fastapi import APIRouter, UploadFile, File, Form, HTTPException, BackgroundTasks
import os
import uuid
from datetime import datetime

from app.core.config import settings
from app.core.database import get_collection
from app.models.analysis import AnalysisStatus
from app.services.analysis.video_processor import VideoProcessor
from app.services.analysis.scoring_engine import ScoringEngine

router = APIRouter()


@router.post("/upload", response_model=dict)
async def upload_video(
    background_tasks: BackgroundTasks,
    video: UploadFile = File(...),
    mentor_name: str = Form(...),
    subject: str = Form(...),
    mentor_id: str = Form(None)
):
    """Upload video for analysis"""
    
    # Validate file extension
    file_ext = video.filename.split('.')[-1].lower()
    if file_ext not in settings.ALLOWED_EXTENSIONS.split(','):
        raise HTTPException(
            status_code=400,
            detail=f"Invalid file type. Allowed: {settings.ALLOWED_EXTENSIONS}"
        )
    
    # Generate unique filename
    analysis_id = str(uuid.uuid4())
    filename = f"{analysis_id}.{file_ext}"
    filepath = os.path.join(settings.UPLOAD_DIR, "videos", filename)
    
    # Save file
    with open(filepath, "wb") as buffer:
        content = await video.read()
        buffer.write(content)
    
    # Create analysis record
    collection = get_collection("analyses")
    analysis_doc = {
        "_id": analysis_id,
        "mentor_id": mentor_id or str(uuid.uuid4()),
        "mentor_name": mentor_name,
        "subject": subject,
        "video_filename": filename,
        "status": AnalysisStatus.PENDING,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    }
    
    await collection.insert_one(analysis_doc)
    
    # Start background processing
    background_tasks.add_task(process_video_analysis, analysis_id, filepath)
    
    return {
        "analysis_id": analysis_id,
        "status": "uploaded",
        "message": "Video uploaded successfully. Analysis started."
    }


@router.get("/{analysis_id}", response_model=dict)
async def get_analysis(analysis_id: str):
    """Get analysis results"""
    collection = get_collection("analyses")
    analysis = await collection.find_one({"_id": analysis_id})
    
    if not analysis:
        raise HTTPException(status_code=404, detail="Analysis not found")
    
    analysis["id"] = str(analysis.pop("_id"))
    return analysis


@router.get("", response_model=dict)
async def list_analyses(skip: int = 0, limit: int = 10):
    """List all analyses"""
    collection = get_collection("analyses")
    
    cursor = collection.find().sort("created_at", -1).skip(skip).limit(limit)
    analyses = await cursor.to_list(length=limit)
    
    for analysis in analyses:
        analysis["id"] = str(analysis.pop("_id"))
    
    total = await collection.count_documents({})
    
    return {
        "analyses": analyses,
        "total": total,
        "skip": skip,
        "limit": limit
    }


async def process_video_analysis(analysis_id: str, video_path: str):
    """Background task to process video analysis"""
    collection = get_collection("analyses")
    
    try:
        # Update status to processing
        await collection.update_one(
            {"_id": analysis_id},
            {"$set": {"status": AnalysisStatus.PROCESSING, "updated_at": datetime.utcnow()}}
        )
        
        # Initialize processors
        video_processor = VideoProcessor(video_path)
        scoring_engine = ScoringEngine()
        
        # Process video
        results = await video_processor.process()
        
        # Calculate scores
        scores = scoring_engine.calculate_scores(results)
        
        # Generate insights
        insights = scoring_engine.generate_insights(results, scores)
        
        # Update database
        await collection.update_one(
            {"_id": analysis_id},
            {
                "$set": {
                    "status": AnalysisStatus.COMPLETED,
                    "scores": scores,
                    "insights": insights,
                    "transcript": results.get("transcript"),
                    "audio_features": results.get("audio_features"),
                    "visual_features": results.get("visual_features"),
                    "nlp_analysis": results.get("nlp_analysis"),
                    "video_duration": results.get("duration"),
                    "completed_at": datetime.utcnow(),
                    "updated_at": datetime.utcnow()
                }
            }
        )
        
    except Exception as e:
        await collection.update_one(
            {"_id": analysis_id},
            {
                "$set": {
                    "status": AnalysisStatus.FAILED,
                    "error": str(e),
                    "updated_at": datetime.utcnow()
                }
            }
        )
        print(f"Analysis failed for {analysis_id}: {str(e)}")