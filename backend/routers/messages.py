from fastapi import APIRouter, HTTPException
from schemas.message import MessageResponse, MessageCreate, ConversationResponse
from services.message_service import MessageService

router = APIRouter(prefix="/messages", tags=["messages"])
message_service = MessageService()


@router.get("/conversations/{user_id}", response_model=list[ConversationResponse])
async def get_conversations(user_id: str):
    """Get user conversations"""
    return message_service.get_conversations(user_id)


@router.get("/{conversation_id}", response_model=list[MessageResponse])
async def get_conversation_messages(
    conversation_id: str,
    skip: int = 0,
    limit: int = 50
):
    """Get messages in a conversation"""
    return message_service.get_messages(conversation_id, skip=skip, limit=limit)


@router.post("", response_model=MessageResponse)
async def send_message(message_data: MessageCreate):
    """Send a message"""
    message = message_service.create_message(message_data)
    if not message:
        raise HTTPException(status_code=400, detail="Failed to send message")
    return message


@router.put("/{message_id}/read")
async def mark_as_read(message_id: str):
    """Mark message as read"""
    success = message_service.mark_as_read(message_id)
    if not success:
        raise HTTPException(status_code=404, detail="Message not found")
    return {"message": "Message marked as read"}
