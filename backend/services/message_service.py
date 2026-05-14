from db.supabase import SupabaseDB
from schemas.message import MessageCreate


class MessageService:
    """Message service"""
    
    def __init__(self):
        self.db = SupabaseDB.get_client()
    
    def get_conversations(self, user_id: str):
        """Get user conversations"""
        try:
            response = self.db.table("conversations").select("*").or_(
                f"user1_id.eq.{user_id}, user2_id.eq.{user_id}"
            ).execute()
            return response.data or []
        except Exception as e:
            print(f"Error getting conversations: {str(e)}")
            return []
    
    def get_messages(self, conversation_id: str, skip: int = 0, limit: int = 50):
        """Get messages in a conversation"""
        try:
            response = self.db.table("messages").select("*").eq(
                "conversation_id", conversation_id
            ).order("created_at", desc=True).range(skip, skip + limit - 1).execute()
            return response.data or []
        except Exception as e:
            print(f"Error getting messages: {str(e)}")
            return []
    
    def create_message(self, message_data: MessageCreate):
        """Create new message"""
        try:
            data = message_data.dict()
            data["is_read"] = False
            response = self.db.table("messages").insert(data).execute()
            return response.data[0] if response.data else None
        except Exception as e:
            print(f"Error creating message: {str(e)}")
            return None
    
    def mark_as_read(self, message_id: str) -> bool:
        """Mark message as read"""
        try:
            self.db.table("messages").update({"is_read": True}).eq("id", message_id).execute()
            return True
        except Exception as e:
            print(f"Error marking message as read: {str(e)}")
            return False
