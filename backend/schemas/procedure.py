from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class ProcedureBase(BaseModel):
    """Government procedure base"""
    user_id: str
    procedure_type: str  # business_registration, land_title_transfer, tax_registration, trade_license_renewal, court_filing_guidance
    description: str
    documents_required: Optional[list] = None


class ProcedureCreate(ProcedureBase):
    """Create procedure"""
    pass


class ProcedureUpdate(BaseModel):
    """Update procedure"""
    status: Optional[str] = None
    notes: Optional[str] = None


class ProcedureResponse(ProcedureBase):
    """Procedure response"""
    id: str
    session_id: str
    status: str  # in_progress, completed
    ai_guidance: Optional[str] = None
    created_at: datetime
    updated_at: datetime
    last_updated: datetime
    
    class Config:
        from_attributes = True
