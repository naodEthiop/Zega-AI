from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class MessageBase(BaseModel):
    """Message base"""
    sender_id: str
    receiver_id: str
    content: str


class MessageCreate(MessageBase):
    """Create message"""
    pass


class MessageResponse(MessageBase):
    """Message response"""
    id: str
    is_read: bool
    created_at: datetime
    
    class Config:
        from_attributes = True


class ConversationResponse(BaseModel):
    """Conversation response"""
    participant_id: str
    participant_name: str
    participant_avatar: Optional[str] = None
    last_message: Optional[str] = None
    last_message_time: Optional[datetime] = None
    unread_count: int = 0
    is_online: bool = False
