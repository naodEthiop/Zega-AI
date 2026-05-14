from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class DocumentBase(BaseModel):
    """Document base"""
    user_id: str
    document_type: str  # lease_agreement, business_contract, employment_agreement, affidavit, power_of_attorney
    title: str
    content: str
    storage_url: Optional[str] = None


class DocumentCreate(DocumentBase):
    """Create document"""
    pass


class DocumentResponse(DocumentBase):
    """Document response"""
    id: str
    file_size: int
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True
