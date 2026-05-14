from db.supabase import SupabaseDB
from schemas.auth import UserLogin, UserRegister, TokenResponse
from utils.security import create_access_token, verify_password, hash_password
from datetime import timedelta
from config.settings import settings


class AuthService:
    """Authentication service"""
    
    def __init__(self):
        self.db = SupabaseDB.get_client()
    
    def login(self, email: str, password: str) -> TokenResponse | None:
        """Authenticate user and return tokens"""
        try:
            # Get user from Supabase
            response = self.db.table("users").select("*").eq("email", email).single().execute()
            user = response.data
            
            if not user or not verify_password(password, user.get("password_hash")):
                return None
            
            # Create tokens
            access_token = create_access_token(
                data={"sub": user["id"], "role": user.get("role", "citizen")},
                expires_delta=timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
            )
            
            return TokenResponse(
                access_token=access_token,
                token_type="bearer",
                expires_in=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60
            )
        except Exception as e:
            print(f"Login error: {str(e)}")
            return None
    
    def register(self, email: str, password: str, full_name: str, role: str = "citizen") -> TokenResponse | None:
        """Register new user"""
        try:
            # Create user in Supabase
            password_hash = hash_password(password)
            
            response = self.db.table("users").insert({
                "email": email,
                "full_name": full_name,
                "password_hash": password_hash,
                "role": role,
                "status": "active",
                "subscription_plan": "free"
            }).execute()
            
            user = response.data[0] if response.data else None
            if not user:
                return None
            
            # Create tokens
            access_token = create_access_token(
                data={"sub": user["id"], "role": role},
                expires_delta=timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
            )
            
            return TokenResponse(
                access_token=access_token,
                token_type="bearer",
                expires_in=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60
            )
        except Exception as e:
            print(f"Registration error: {str(e)}")
            return None
    
    def refresh_token(self, token: str) -> TokenResponse | None:
        """Refresh JWT token"""
        # Implementation would verify the refresh token and issue new access token
        return None
