from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime


class LawyerProfile(BaseModel):
    """Lawyer profile schema"""
    user_id: str
    specializations: List[str]  # Commercial, Family, Criminal, etc.
    license_number: str
    bar_association: Optional[str] = None
    years_of_experience: int
    hourly_rate: float  # in ETB
    biography: Optional[str] = None
    office_address: Optional[str] = None


class LawyerResponse(LawyerProfile):
    """Lawyer response schema"""
    id: str
    status: str  # active, inactive
    rating: float
    total_cases: int
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True
