from fastapi import APIRouter, HTTPException
from schemas.procedure import ProcedureResponse, ProcedureCreate, ProcedureUpdate
from services.procedure_service import ProcedureService

router = APIRouter(prefix="/procedures", tags=["procedures"])
procedure_service = ProcedureService()

# Government procedure types
PROCEDURE_TYPES = [
    "Business Registration",
    "Land Title Transfer",
    "Tax Registration",
    "Trade License Renewal",
    "Court Filing Guidance"
]


@router.get("", response_model=list[ProcedureResponse])
async def get_procedures(
    skip: int = 0,
    limit: int = 10,
    procedure_type: str = None,
    status: str = None,
    user_id: str = None
):
    """Get all government procedures"""
    return procedure_service.get_procedures(
        skip=skip,
        limit=limit,
        procedure_type=procedure_type,
        status=status,
        user_id=user_id
    )


@router.post("", response_model=ProcedureResponse)
async def create_procedure(procedure_data: ProcedureCreate):
    """Create new procedure request"""
    procedure = procedure_service.create_procedure(procedure_data)
    if not procedure:
        raise HTTPException(status_code=400, detail="Failed to create procedure")
    return procedure


@router.get("/{procedure_id}", response_model=ProcedureResponse)
async def get_procedure(procedure_id: str):
    """Get specific procedure"""
    procedure = procedure_service.get_procedure(procedure_id)
    if not procedure:
        raise HTTPException(status_code=404, detail="Procedure not found")
    return procedure


@router.put("/{procedure_id}", response_model=ProcedureResponse)
async def update_procedure(procedure_id: str, procedure_data: ProcedureUpdate):
    """Update procedure"""
    procedure = procedure_service.update_procedure(procedure_id, procedure_data)
    if not procedure:
        raise HTTPException(status_code=404, detail="Procedure not found")
    return procedure


@router.get("/types", response_model=list[str])
async def get_procedure_types():
    """Get list of available procedure types"""
    return PROCEDURE_TYPES
