from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, validator
from typing import List, Optional, Dict, Any
import uuid
from datetime import datetime


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Profile Generation Logic
from profile_generator import generate_spiritual_profile

# Define Models
class EnergyCenterData(BaseModel):
    frequency: int = Field(ge=0, le=100, description="Frequency/vibration level (0-100)")
    balance: int = Field(ge=0, le=100, description="Balance/alignment level (0-100)")
    blockage: int = Field(ge=0, le=100, description="Blockage/distortion level (0-100)")

class EnergyCentersInput(BaseModel):
    root: EnergyCenterData
    sacral: EnergyCenterData
    solarPlexus: EnergyCenterData
    heart: EnergyCenterData
    throat: EnergyCenterData
    thirdEye: EnergyCenterData
    crown: EnergyCenterData

class ProfileRequest(BaseModel):
    sessionId: Optional[str] = None
    energyCenters: EnergyCentersInput

class PersonalityData(BaseModel):
    traits: List[str]
    behaviors: List[str]

class SpiritualData(BaseModel):
    level: str
    insights: List[str]

class HealingData(BaseModel):
    practices: List[str]
    growthAreas: List[str]

class GeneratedProfile(BaseModel):
    overallLevel: str
    overallBalance: int
    dominantChakra: str
    personality: PersonalityData
    spiritual: SpiritualData
    healing: HealingData

class EnergyProfile(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()), alias="_id")
    sessionId: str
    energyCenters: Dict[str, Dict[str, int]]
    generatedProfile: GeneratedProfile
    createdAt: datetime = Field(default_factory=datetime.utcnow)
    updatedAt: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        allow_population_by_field_name = True

class Session(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()), alias="_id")
    sessionId: str
    profileCount: int = 0
    createdAt: datetime = Field(default_factory=datetime.utcnow)
    lastAccessedAt: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        allow_population_by_field_name = True

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Law of One Profile Generator API", "version": "1.0.0"}

@api_router.post("/profiles", response_model=Dict[str, Any])
async def create_profile(request: ProfileRequest):
    try:
        # Generate session ID if not provided
        session_id = request.sessionId or str(uuid.uuid4())
        
        # Convert energy centers to dict format
        energy_centers_dict = {
            "root": request.energyCenters.root.dict(),
            "sacral": request.energyCenters.sacral.dict(),
            "solarPlexus": request.energyCenters.solarPlexus.dict(),
            "heart": request.energyCenters.heart.dict(),
            "throat": request.energyCenters.throat.dict(),
            "thirdEye": request.energyCenters.thirdEye.dict(),
            "crown": request.energyCenters.crown.dict()
        }
        
        # Generate spiritual profile
        generated_profile = generate_spiritual_profile(energy_centers_dict)
        
        # Create profile object
        profile_data = {
            "sessionId": session_id,
            "energyCenters": energy_centers_dict,
            "generatedProfile": generated_profile,
            "createdAt": datetime.utcnow(),
            "updatedAt": datetime.utcnow()
        }
        
        # Save to database
        result = await db.energy_profiles.insert_one(profile_data)
        profile_data["_id"] = str(result.inserted_id)
        
        # Update or create session
        await db.sessions.update_one(
            {"sessionId": session_id},
            {
                "$set": {"lastAccessedAt": datetime.utcnow()},
                "$inc": {"profileCount": 1},
                "$setOnInsert": {
                    "sessionId": session_id,
                    "createdAt": datetime.utcnow()
                }
            },
            upsert=True
        )
        
        return {
            "success": True,
            "sessionId": session_id,
            "profileId": profile_data["_id"],
            "profile": generated_profile
        }
        
    except Exception as e:
        logging.error(f"Error creating profile: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error generating profile: {str(e)}")

@api_router.get("/profiles/{session_id}")
async def get_profile_history(session_id: str):
    try:
        profiles = await db.energy_profiles.find(
            {"sessionId": session_id}
        ).sort("createdAt", -1).to_list(50)
        
        # Convert ObjectId to string
        for profile in profiles:
            profile["_id"] = str(profile["_id"])
        
        return {
            "success": True,
            "sessionId": session_id,
            "profiles": profiles
        }
        
    except Exception as e:
        logging.error(f"Error fetching profile history: {str(e)}")
        raise HTTPException(status_code=500, detail="Error fetching profile history")

@api_router.get("/profiles/profile/{profile_id}")
async def get_profile_by_id(profile_id: str):
    try:
        from bson import ObjectId
        profile = await db.energy_profiles.find_one({"_id": ObjectId(profile_id)})
        
        if not profile:
            raise HTTPException(status_code=404, detail="Profile not found")
        
        profile["_id"] = str(profile["_id"])
        
        return {
            "success": True,
            "profile": profile
        }
        
    except Exception as e:
        logging.error(f"Error fetching profile: {str(e)}")
        raise HTTPException(status_code=500, detail="Error fetching profile")

@api_router.get("/sessions/{session_id}/stats")
async def get_session_stats(session_id: str):
    try:
        session = await db.sessions.find_one({"sessionId": session_id})
        if not session:
            return {"success": True, "stats": {"profileCount": 0, "firstVisit": None}}
        
        return {
            "success": True,
            "stats": {
                "profileCount": session.get("profileCount", 0),
                "firstVisit": session.get("createdAt"),
                "lastVisit": session.get("lastAccessedAt")
            }
        }
        
    except Exception as e:
        logging.error(f"Error fetching session stats: {str(e)}")
        raise HTTPException(status_code=500, detail="Error fetching session stats")

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
