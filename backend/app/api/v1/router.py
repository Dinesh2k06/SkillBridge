from fastapi import APIRouter
from app.api.v1.auth import router as auth_router
from app.api.v1.organizations import router as org_router
from app.api.v1.users import router as user_router
from app.api.v1.matches import router as match_router
from app.api.v1.exchanges import router as exchange_router
from app.api.v1.mentors import router as mentor_router
from app.api.v1.doubts import router as doubt_router
from app.api.v1.courses import router as course_router
from app.api.v1.ai import router as ai_router

api_v1_router = APIRouter()
api_v1_router.include_router(auth_router)
api_v1_router.include_router(org_router)
api_v1_router.include_router(user_router)
api_v1_router.include_router(match_router)
api_v1_router.include_router(exchange_router)
api_v1_router.include_router(mentor_router)
api_v1_router.include_router(doubt_router)
api_v1_router.include_router(course_router)
api_v1_router.include_router(ai_router)
