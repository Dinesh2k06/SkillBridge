from fastapi import APIRouter
from app.schemas.ai import DoubtAnalysisRequest, DoubtAnalysisOut, SkillExtractionRequest, SkillExtractionOut
from app.ai.gemini_service import GeminiAIService

router = APIRouter(prefix="/ai", tags=["Google Gemini AI Integration"])

@router.post("/analyze-doubt", response_model=DoubtAnalysisOut)
def analyze_doubt(req: DoubtAnalysisRequest):
    """
    Direct Gemini AI endpoint to classify a student's project doubt,
    identify required skills, and recommend mentor domains.
    """
    res = GeminiAIService.analyze_project_doubt(
        problem_title=req.problem_title,
        tech_stack=req.technology_stack,
        description=req.description
    )
    return DoubtAnalysisOut(
        category=res.get("category", "Backend Development"),
        technology=res.get("technology", req.technology_stack),
        topic=res.get("topic", req.problem_title),
        required_skills=res.get("required_skills", [req.technology_stack]),
        recommended_mentor_type=res.get("recommended_mentor_type", "Backend Mentors")
    )

@router.post("/extract-skills", response_model=SkillExtractionOut)
def extract_skills(req: SkillExtractionRequest):
    """
    Direct Gemini AI endpoint to extract software skills from user bio or description text.
    """
    skills = GeminiAIService.extract_skills_from_text(req.text)
    return SkillExtractionOut(extracted_skills=skills)
