from fastapi import APIRouter, HTTPException, UploadFile, File
from schemas.document import DocumentResponse, DocumentCreate
from services.document_service import DocumentService

router = APIRouter(prefix="/documents", tags=["documents"])
document_service = DocumentService()


@router.get("", response_model=list[DocumentResponse])
async def get_documents(
    skip: int = 0,
    limit: int = 10,
    document_type: str = None,
    user_id: str = None
):
    """Get all documents"""
    return document_service.get_documents(
        skip=skip,
        limit=limit,
        document_type=document_type,
        user_id=user_id
    )


@router.post("", response_model=DocumentResponse)
async def create_document(document_data: DocumentCreate):
    """Create new document"""
    document = document_service.create_document(document_data)
    if not document:
        raise HTTPException(status_code=400, detail="Failed to create document")
    return document


@router.get("/{document_id}", response_model=DocumentResponse)
async def get_document(document_id: str):
    """Get specific document"""
    document = document_service.get_document(document_id)
    if not document:
        raise HTTPException(status_code=404, detail="Document not found")
    return document


@router.delete("/{document_id}")
async def delete_document(document_id: str):
    """Delete document"""
    success = document_service.delete_document(document_id)
    if not success:
        raise HTTPException(status_code=404, detail="Document not found")
    return {"message": "Document deleted successfully"}
