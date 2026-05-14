from db.supabase import SupabaseDB
from schemas.lawyer import LawyerProfile


class LawyerService:
    """Lawyer management service"""
    
    def __init__(self):
        self.db = SupabaseDB.get_client()
    
    def get_lawyers(self, skip: int = 0, limit: int = 10, specialization: str = None, status: str = None, min_rating: float = 0) -> list:
        """Get all lawyers with optional filters"""
        try:
            query = self.db.table("lawyers").select("*")
            
            if status:
                query = query.eq("status", status)
            if min_rating > 0:
                query = query.gte("rating", min_rating)
            
            response = query.range(skip, skip + limit - 1).execute()
            lawyers = response.data or []
            
            # Filter by specialization if provided
            if specialization:
                lawyers = [l for l in lawyers if specialization in l.get("specializations", [])]
            
            return lawyers
        except Exception as e:
            print(f"Error getting lawyers: {str(e)}")
            return []
    
    def get_lawyer(self, lawyer_id: str):
        """Get specific lawyer"""
        try:
            response = self.db.table("lawyers").select("*").eq("id", lawyer_id).single().execute()
            return response.data
        except Exception as e:
            print(f"Error getting lawyer: {str(e)}")
            return None
    
    def update_lawyer(self, lawyer_id: str, lawyer_data: LawyerProfile):
        """Update lawyer profile"""
        try:
            update_data = lawyer_data.dict(exclude_unset=True)
            response = self.db.table("lawyers").update(update_data).eq("id", lawyer_id).execute()
            return response.data[0] if response.data else None
        except Exception as e:
            print(f"Error updating lawyer: {str(e)}")
            return None
