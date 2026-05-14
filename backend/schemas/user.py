from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime


class UserBase(BaseModel):
    """Base user schema"""
    email: EmailStr
    full_name: str
    phone: Optional[str] = None
    avatar_url: Optional[str] = None


class UserCreate(UserBase):
    """User creation schema"""
    password: str
    role: str = "citizen"


class UserUpdate(BaseModel):
    """User update schema"""
    full_name: Optional[str] = None
    phone: Optional[str] = None
    avatar_url: Optional[str] = None


class UserResponse(UserBase):
    """User response schema"""
    id: str
    role: str
    status: str  # active, inactive, suspended
    subscription_plan: str  # free, premium
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True
