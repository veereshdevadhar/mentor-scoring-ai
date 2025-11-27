"""
MongoDB Database Connection
"""

from motor.motor_asyncio import AsyncIOMotorClient
from app.core.config import settings

# Global database client
mongodb_client: AsyncIOMotorClient = None


async def connect_to_mongo():
    """Connect to MongoDB Atlas"""
    global mongodb_client
    mongodb_client = AsyncIOMotorClient(settings.MONGODB_URL)
    
    # Test connection
    await mongodb_client.admin.command('ping')
    print(f"✅ Connected to MongoDB: {settings.DATABASE_NAME}")


async def close_mongo_connection():
    """Close MongoDB connection"""
    global mongodb_client
    if mongodb_client is not None:
        mongodb_client.close()
        print("✅ Closed MongoDB connection")


def get_database():
    """Get database instance"""
    return mongodb_client[settings.DATABASE_NAME]


def get_collection(collection_name: str):
    """Get collection from database"""
    db = get_database()
    return db[collection_name]