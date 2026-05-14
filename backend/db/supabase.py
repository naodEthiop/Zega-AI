from supabase import create_client, Client
from config.settings import settings


class SupabaseDB:
    """Supabase database client wrapper"""
    
    _instance: Client = None
    
    @classmethod
    def get_client(cls) -> Client:
        """Get or create Supabase client"""
        if cls._instance is None:
            cls._instance = create_client(
                settings.SUPABASE_URL,
                settings.SUPABASE_KEY
            )
        return cls._instance
    
    @classmethod
    def get_db(cls) -> Client:
        """Alias for get_client"""
        return cls.get_client()


def get_supabase() -> Client:
    """Dependency injection for Supabase client"""
    return SupabaseDB.get_client()
