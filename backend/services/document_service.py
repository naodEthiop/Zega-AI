from db.supabase import SupabaseDB
from schemas.document import DocumentCreate


class DocumentService:
    """Document management service"""
    
    def __init__(self):
        self.db = SupabaseDB.get_client()
    
    def get_documents(self, skip: int = 0, limit: int = 10, document_type: str = None, user_id: str = None) -> list:
        """Get all documents"""
        try:
            query = self.db.table("documents").select("*")
            
            if document_type:
                query = query.eq("document_type", document_type)
            if user_id:
                query = query.eq("user_id", user_id)
            
            response = query.order("created_at", desc=True).range(skip, skip + limit - 1).execute()
            return response.data or []
        except Exception as e:
            print(f"Error getting documents: {str(e)}")
            return []
    
    def create_document(self, document_data: DocumentCreate):
        """Create new document"""
        try:
            response = self.db.table("documents").insert(document_data.dict()).execute()
            return response.data[0] if response.data else None
        except Exception as e:
            print(f"Error creating document: {str(e)}")
            return None
    
    def get_document(self, document_id: str):
        """Get specific document"""
        try:
            response = self.db.table("documents").select("*").eq("id", document_id).single().execute()
            return response.data
        except Exception as e:
            print(f"Error getting document: {str(e)}")
            return None
    
    def delete_document(self, document_id: str) -> bool:
        """Delete document"""
        try:
            self.db.table("documents").delete().eq("id", document_id).execute()
            return True
        except Exception as e:
            print(f"Error deleting document: {str(e)}")
            return False
