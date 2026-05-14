from pydantic_settings import BaseSettings
from typing import Optional


class Settings(BaseSettings):
    """Application settings from environment variables"""
    
    # API Configuration
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "Zega AI Admin API"
    
    # Server
    DEBUG: bool = False
    ENVIRONMENT: str = "development"
    
    # Database
    SUPABASE_URL: str
    SUPABASE_KEY: str
    SUPABASE_ANON_KEY: str
    
    # JWT Configuration
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7
    
    # Groq AI Configuration
    GROQ_API_KEY: str
    GROQ_MODEL: str = "llama-3-70b-versatile"
    
    # CORS Configuration
    ALLOWED_ORIGINS: list = [
        "http://localhost:5173",
        "http://localhost:3000",
    ]
    
    # Email Configuration
    SMTP_SERVER: Optional[str] = None
    SMTP_PORT: Optional[int] = None
    SMTP_USER: Optional[str] = None
    SMTP_PASSWORD: Optional[str] = None
    FROM_EMAIL: Optional[str] = None
    
    # Payment Configuration
    CHAPA_API_KEY: Optional[str] = None
    CHAPA_SECRET_KEY: Optional[str] = None
    TELEBIRR_API_KEY: Optional[str] = None
    
    # Storage
    STORAGE_BUCKET: str = "documents"
    MAX_UPLOAD_SIZE: int = 10 * 1024 * 1024  # 10MB
    
    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()
