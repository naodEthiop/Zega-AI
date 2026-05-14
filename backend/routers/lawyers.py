from fastapi import APIRouter, HTTPException
from schemas.lawyer import LawyerResponse, LawyerProfile
from services.lawyer_service import LawyerService

router = APIRouter(prefix="/lawyers", tags=["lawyers"])
lawyer_service = LawyerService()

# Ethiopian legal specializations
SPECIALIZATIONS = [
    "Commercial Law",
    "Family Law",
    "Criminal Law",
    "Land and Property Law",
    "Labor Law",
    "Constitutional Law"
]


@router.get("", response_model=list[LawyerResponse])
async def get_all_lawyers(
    skip: int = 0,
    limit: int = 10,
    specialization: str = None,
    status: str = None,
    min_rating: float = 0
):
    """Get all lawyers with optional filters"""
    return lawyer_service.get_lawyers(
        skip=skip,
        limit=limit,
        specialization=specialization,
        status=status,
        min_rating=min_rating
    )


@router.get("/{lawyer_id}", response_model=LawyerResponse)
async def get_lawyer(lawyer_id: str):
    """Get specific lawyer"""
    lawyer = lawyer_service.get_lawyer(lawyer_id)
    if not lawyer:
        raise HTTPException(status_code=404, detail="Lawyer not found")
    return lawyer


@router.put("/{lawyer_id}", response_model=LawyerResponse)
async def update_lawyer(lawyer_id: str, lawyer_data: LawyerProfile):
    """Update lawyer profile"""
    lawyer = lawyer_service.update_lawyer(lawyer_id, lawyer_data)
    if not lawyer:
        raise HTTPException(status_code=404, detail="Lawyer not found")
    return lawyer


@router.get("/specializations", response_model=list[str])
async def get_specializations():
    """Get list of available specializations"""
    return SPECIALIZATIONS
