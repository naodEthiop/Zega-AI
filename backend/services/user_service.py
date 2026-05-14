from db.supabase import SupabaseDB
from schemas.user import UserResponse, UserUpdate


class UserService:
    """User management service"""
    
    def __init__(self):
        self.db = SupabaseDB.get_client()
    
    def get_users(self, skip: int = 0, limit: int = 10, role: str = None, status: str = None) -> list:
        """Get all users with optional filters"""
        try:
            query = self.db.table("users").select("*")
            
            if role:
                query = query.eq("role", role)
            if status:
                query = query.eq("status", status)
            
            response = query.range(skip, skip + limit - 1).execute()
            return response.data or []
        except Exception as e:
            print(f"Error getting users: {str(e)}")
            return []
    
    def get_user(self, user_id: str) -> UserResponse | None:
        """Get specific user"""
        try:
            response = self.db.table("users").select("*").eq("id", user_id).single().execute()
            return response.data
        except Exception as e:
            print(f"Error getting user: {str(e)}")
            return None
    
    def update_user(self, user_id: str, user_data: UserUpdate) -> UserResponse | None:
        """Update user"""
        try:
            update_data = user_data.dict(exclude_unset=True)
            response = self.db.table("users").update(update_data).eq("id", user_id).execute()
            return response.data[0] if response.data else None
        except Exception as e:
            print(f"Error updating user: {str(e)}")
            return None
    
    def delete_user(self, user_id: str) -> bool:
        """Delete user"""
        try:
            self.db.table("users").delete().eq("id", user_id).execute()
            return True
        except Exception as e:
            print(f"Error deleting user: {str(e)}")
            return False
