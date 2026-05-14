from pydantic import BaseModel, EmailStr
from typing import Optional


class TokenResponse(BaseModel):
    """JWT token response"""
    access_token: str
    refresh_token: Optional[str] = None
    token_type: str = "bearer"
    expires_in: int


class UserLogin(BaseModel):
    """User login request"""
    email: EmailStr
    password: str


class UserRegister(BaseModel):
    """User registration request"""
    email: EmailStr
    password: str
    full_name: str
    role: str = "citizen"  # citizen, business_owner, lawyer, admin


class TokenPayload(BaseModel):
    """JWT token payload"""
    sub: str
    exp: int
    role: str
