"""
Mentors API Routes
"""

from fastapi import APIRouter, HTTPException
from app.core.database import get_collection

router = APIRouter()


@router.get("", response_model=dict)
async def list_mentors():
    """List all mentors with statistics"""
    analyses_collection = get_collection("analyses")
    
    # Aggregate mentor statistics
    pipeline = [
        {"$match": {"status": "completed"}},
        {
            "$group": {
                "_id": "$mentor_id",
                "mentor_name": {"$first": "$mentor_name"},
                "total_sessions": {"$sum": 1},
                "average_score": {"$avg": "$scores.overall"},
                "last_session": {"$max": "$created_at"}
            }
        },
        {"$sort": {"average_score": -1}}
    ]
    
    cursor = analyses_collection.aggregate(pipeline)
    mentors = await cursor.to_list(length=None)
    
    for mentor in mentors:
        mentor["id"] = str(mentor.pop("_id"))
        mentor["average_score"] = round(mentor.get("average_score", 0), 2)
    
    return {"mentors": mentors}


@router.get("/top", response_model=dict)
async def get_top_mentors(limit: int = 10):
    """Get top performing mentors"""
    analyses_collection = get_collection("analyses")
    
    pipeline = [
        {"$match": {"status": "completed"}},
        {
            "$group": {
                "_id": "$mentor_id",
                "mentor_name": {"$first": "$mentor_name"},
                "average_score": {"$avg": "$scores.overall"},
                "total_sessions": {"$sum": 1}
            }
        },
        {"$match": {"total_sessions": {"$gte": 1}}},
        {"$sort": {"average_score": -1}},
        {"$limit": limit}
    ]
    
    cursor = analyses_collection.aggregate(pipeline)
    top_mentors = await cursor.to_list(length=limit)
    
    for idx, mentor in enumerate(top_mentors, 1):
        mentor["rank"] = idx
        mentor["id"] = str(mentor.pop("_id"))
        mentor["average_score"] = round(mentor.get("average_score", 0), 2)
    
    return {"top_mentors": top_mentors}


@router.get("/{mentor_id}", response_model=dict)
async def get_mentor_details(mentor_id: str):
    """Get detailed mentor statistics"""
    analyses_collection = get_collection("analyses")
    
    cursor = analyses_collection.find({"mentor_id": mentor_id}).sort("created_at", -1)
    analyses = await cursor.to_list(length=None)
    
    if not analyses:
        raise HTTPException(status_code=404, detail="Mentor not found")
    
    completed_analyses = [a for a in analyses if a["status"] == "completed"]
    
    if completed_analyses:
        scores = [a["scores"]["overall"] for a in completed_analyses if "scores" in a]
        avg_score = sum(scores) / len(scores) if scores else 0
        highest = max(scores) if scores else 0
        lowest = min(scores) if scores else 0
    else:
        avg_score = highest = lowest = 0
    
    recent = []
    for analysis in analyses[:5]:
        analysis["id"] = str(analysis.pop("_id"))
        recent.append(analysis)
    
    return {
        "mentor_id": mentor_id,
        "mentor_name": analyses[0]["mentor_name"],
        "total_sessions": len(analyses),
        "completed_sessions": len(completed_analyses),
        "average_score": round(avg_score, 2),
        "highest_score": round(highest, 2),
        "lowest_score": round(lowest, 2),
        "recent_analyses": recent
    }