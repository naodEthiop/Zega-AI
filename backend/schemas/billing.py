from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class BillingBase(BaseModel):
    """Billing transaction base"""
    user_id: str
    amount: float  # in ETB
    plan_type: str  # free, premium
    payment_method: str  # chapa, telebirr
    description: Optional[str] = None


class BillingCreate(BillingBase):
    """Create billing transaction"""
    pass


class BillingResponse(BillingBase):
    """Billing transaction response"""
    id: str
    transaction_id: str
    status: str  # paid, pending, failed
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True
