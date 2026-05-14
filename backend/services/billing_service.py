from db.supabase import SupabaseDB
from schemas.billing import BillingCreate


class BillingService:
    """Billing management service"""
    
    def __init__(self):
        self.db = SupabaseDB.get_client()
    
    def get_billings(self, skip: int = 0, limit: int = 10, status: str = None, user_id: str = None) -> list:
        """Get all billing records"""
        try:
            query = self.db.table("billings").select("*")
            
            if status:
                query = query.eq("status", status)
            if user_id:
                query = query.eq("user_id", user_id)
            
            response = query.order("created_at", desc=True).range(skip, skip + limit - 1).execute()
            return response.data or []
        except Exception as e:
            print(f"Error getting billings: {str(e)}")
            return []
    
    def create_billing(self, billing_data: BillingCreate):
        """Create new billing record"""
        try:
            response = self.db.table("billings").insert(billing_data.dict()).execute()
            return response.data[0] if response.data else None
        except Exception as e:
            print(f"Error creating billing: {str(e)}")
            return None
    
    def get_summary(self):
        """Get billing summary statistics"""
        try:
            # Get total revenue (paid transactions only)
            response = self.db.table("billings").select("amount").eq("status", "paid").execute()
            total_revenue = sum(b["amount"] for b in response.data or [])
            
            # Get transaction counts
            all_response = self.db.table("billings").select("id").execute()
            total_transactions = len(all_response.data or [])
            
            return {
                "total_revenue": total_revenue,
                "total_transactions": total_transactions,
                "pending_transactions": len([b for b in (all_response.data or []) if b.get("status") == "pending"])
            }
        except Exception as e:
            print(f"Error getting summary: {str(e)}")
            return {"total_revenue": 0, "total_transactions": 0}
    
    def get_monthly_revenue(self):
        """Get monthly revenue data"""
        try:
            response = self.db.table("billings").select("*").eq("status", "paid").execute()
            # Group by month
            return []
        except Exception as e:
            print(f"Error getting monthly revenue: {str(e)}")
            return []
