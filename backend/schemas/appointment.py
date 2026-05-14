from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class AppointmentBase(BaseModel):
    """Appointment base"""
    client_id: str
    lawyer_id: str
    service_type: str
    scheduled_at: datetime
    notes: Optional[str] = None


class AppointmentCreate(AppointmentBase):
    """Create appointment"""
    pass


class AppointmentUpdate(BaseModel):
    """Update appointment"""
    status: Optional[str] = None
    notes: Optional[str] = None


class AppointmentResponse(AppointmentBase):
    """Appointment response"""
    id: str
    status: str  # upcoming, completed, cancelled
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True
