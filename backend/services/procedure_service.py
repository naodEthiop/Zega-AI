from db.supabase import SupabaseDB
from schemas.procedure import ProcedureCreate, ProcedureUpdate


class ProcedureService:
    """Government procedure service"""
    
    def __init__(self):
        self.db = SupabaseDB.get_client()
    
    def get_procedures(self, skip: int = 0, limit: int = 10, procedure_type: str = None, status: str = None, user_id: str = None) -> list:
        """Get all procedures"""
        try:
            query = self.db.table("procedures").select("*")
            
            if procedure_type:
                query = query.eq("procedure_type", procedure_type)
            if status:
                query = query.eq("status", status)
            if user_id:
                query = query.eq("user_id", user_id)
            
            response = query.order("created_at", desc=True).range(skip, skip + limit - 1).execute()
            return response.data or []
        except Exception as e:
            print(f"Error getting procedures: {str(e)}")
            return []
    
    def create_procedure(self, procedure_data: ProcedureCreate):
        """Create new procedure"""
        try:
            data = procedure_data.dict()
            data["status"] = "in_progress"
            response = self.db.table("procedures").insert(data).execute()
            return response.data[0] if response.data else None
        except Exception as e:
            print(f"Error creating procedure: {str(e)}")
            return None
    
    def get_procedure(self, procedure_id: str):
        """Get specific procedure"""
        try:
            response = self.db.table("procedures").select("*").eq("id", procedure_id).single().execute()
            return response.data
        except Exception as e:
            print(f"Error getting procedure: {str(e)}")
            return None
    
    def update_procedure(self, procedure_id: str, procedure_data: ProcedureUpdate):
        """Update procedure"""
        try:
            update_data = procedure_data.dict(exclude_unset=True)
            response = self.db.table("procedures").update(update_data).eq("id", procedure_id).execute()
            return response.data[0] if response.data else None
        except Exception as e:
            print(f"Error updating procedure: {str(e)}")
            return None
