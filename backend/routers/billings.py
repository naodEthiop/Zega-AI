from fastapi import APIRouter, HTTPException
from schemas.billing import BillingResponse, BillingCreate
from services.billing_service import BillingService

router = APIRouter(prefix="/billings", tags=["billings"])
billing_service = BillingService()


@router.get("", response_model=list[BillingResponse])
async def get_billings(
    skip: int = 0,
    limit: int = 10,
    status: str = None,
    user_id: str = None
):
    """Get all billing records"""
    return billing_service.get_billings(
        skip=skip,
        limit=limit,
        status=status,
        user_id=user_id
    )


@router.post("", response_model=BillingResponse)
async def create_billing(billing_data: BillingCreate):
    """Create new billing record"""
    billing = billing_service.create_billing(billing_data)
    if not billing:
        raise HTTPException(status_code=400, detail="Failed to create billing record")
    return billing


@router.get("/summary")
async def get_billing_summary():
    """Get billing summary statistics"""
    return billing_service.get_summary()


@router.get("/revenue/monthly")
async def get_monthly_revenue():
    """Get monthly revenue data"""
    return billing_service.get_monthly_revenue()
