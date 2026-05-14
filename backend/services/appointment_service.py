from db.supabase import SupabaseDB
from schemas.appointment import AppointmentCreate, AppointmentUpdate


class AppointmentService:
    """Appointment management service"""
    
    def __init__(self):
        self.db = SupabaseDB.get_client()
    
    def get_appointments(self, skip: int = 0, limit: int = 10, status: str = None, lawyer_id: str = None, client_id: str = None) -> list:
        """Get all appointments"""
        try:
            query = self.db.table("appointments").select("*")
            
            if status:
                query = query.eq("status", status)
            if lawyer_id:
                query = query.eq("lawyer_id", lawyer_id)
            if client_id:
                query = query.eq("client_id", client_id)
            
            response = query.order("scheduled_at", desc=True).range(skip, skip + limit - 1).execute()
            return response.data or []
        except Exception as e:
            print(f"Error getting appointments: {str(e)}")
            return []
    
    def create_appointment(self, appointment_data: AppointmentCreate):
        """Create new appointment"""
        try:
            data = appointment_data.dict()
            data["status"] = "upcoming"
            response = self.db.table("appointments").insert(data).execute()
            return response.data[0] if response.data else None
        except Exception as e:
            print(f"Error creating appointment: {str(e)}")
            return None
    
    def get_appointment(self, appointment_id: str):
        """Get specific appointment"""
        try:
            response = self.db.table("appointments").select("*").eq("id", appointment_id).single().execute()
            return response.data
        except Exception as e:
            print(f"Error getting appointment: {str(e)}")
            return None
    
    def update_appointment(self, appointment_id: str, appointment_data: AppointmentUpdate):
        """Update appointment"""
        try:
            update_data = appointment_data.dict(exclude_unset=True)
            response = self.db.table("appointments").update(update_data).eq("id", appointment_id).execute()
            return response.data[0] if response.data else None
        except Exception as e:
            print(f"Error updating appointment: {str(e)}")
            return None
