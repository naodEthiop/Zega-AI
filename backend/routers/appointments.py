from fastapi import APIRouter, HTTPException
from schemas.appointment import AppointmentResponse, AppointmentCreate, AppointmentUpdate
from services.appointment_service import AppointmentService

router = APIRouter(prefix="/appointments", tags=["appointments"])
appointment_service = AppointmentService()


@router.get("", response_model=list[AppointmentResponse])
async def get_appointments(
    skip: int = 0,
    limit: int = 10,
    status: str = None,
    lawyer_id: str = None,
    client_id: str = None
):
    """Get all appointments"""
    return appointment_service.get_appointments(
        skip=skip,
        limit=limit,
        status=status,
        lawyer_id=lawyer_id,
        client_id=client_id
    )


@router.post("", response_model=AppointmentResponse)
async def create_appointment(appointment_data: AppointmentCreate):
    """Create new appointment"""
    appointment = appointment_service.create_appointment(appointment_data)
    if not appointment:
        raise HTTPException(status_code=400, detail="Failed to create appointment")
    return appointment


@router.get("/{appointment_id}", response_model=AppointmentResponse)
async def get_appointment(appointment_id: str):
    """Get specific appointment"""
    appointment = appointment_service.get_appointment(appointment_id)
    if not appointment:
        raise HTTPException(status_code=404, detail="Appointment not found")
    return appointment


@router.put("/{appointment_id}", response_model=AppointmentResponse)
async def update_appointment(appointment_id: str, appointment_data: AppointmentUpdate):
    """Update appointment"""
    appointment = appointment_service.update_appointment(appointment_id, appointment_data)
    if not appointment:
        raise HTTPException(status_code=404, detail="Appointment not found")
    return appointment
