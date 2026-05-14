from fastapi import APIRouter, Depends, HTTPException, status
from schemas.auth import UserLogin, UserRegister, TokenResponse
from services.auth_service import AuthService
from db.supabase import get_supabase

router = APIRouter(prefix="/auth", tags=["auth"])
auth_service = AuthService()


@router.post("/login", response_model=TokenResponse)
async def login(credentials: UserLogin):
    """User login endpoint"""
    tokens = auth_service.login(credentials.email, credentials.password)
    if not tokens:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        )
    return tokens


@router.post("/register", response_model=TokenResponse)
async def register(user_data: UserRegister):
    """User registration endpoint"""
    tokens = auth_service.register(
        email=user_data.email,
        password=user_data.password,
        full_name=user_data.full_name,
        role=user_data.role
    )
    if not tokens:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Registration failed"
        )
    return tokens


@router.post("/refresh", response_model=TokenResponse)
async def refresh_token(token: str):
    """Refresh JWT token"""
    new_tokens = auth_service.refresh_token(token)
    if not new_tokens:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid refresh token"
        )
    return new_tokens


@router.post("/logout")
async def logout(token: str):
    """User logout endpoint"""
    return {"message": "Logged out successfully"}
