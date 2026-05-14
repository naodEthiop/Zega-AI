from fastapi import APIRouter, Depends, HTTPException
from schemas.user import UserResponse, UserUpdate
from services.user_service import UserService

router = APIRouter(prefix="/users", tags=["users"])
user_service = UserService()


@router.get("", response_model=list[UserResponse])
async def get_all_users(
    skip: int = 0,
    limit: int = 10,
    role: str = None,
    status: str = None
):
    """Get all users with optional filters"""
    return user_service.get_users(skip=skip, limit=limit, role=role, status=status)


@router.get("/{user_id}", response_model=UserResponse)
async def get_user(user_id: str):
    """Get specific user"""
    user = user_service.get_user(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


@router.put("/{user_id}", response_model=UserResponse)
async def update_user(user_id: str, user_data: UserUpdate):
    """Update user"""
    user = user_service.update_user(user_id, user_data)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


@router.delete("/{user_id}")
async def delete_user(user_id: str):
    """Delete user"""
    success = user_service.delete_user(user_id)
    if not success:
        raise HTTPException(status_code=404, detail="User not found")
    return {"message": "User deleted successfully"}
