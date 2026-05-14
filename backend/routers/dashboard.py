from fastapi import APIRouter

router = APIRouter(prefix="/dashboard", tags=["dashboard"])


@router.get("/stats")
async def get_dashboard_stats():
    """Get dashboard statistics"""
    return {
        "total_users": 0,
        "active_lawyers": 0,
        "total_revenue": 0,
        "pending_cases": 0,
        "total_documents": 0,
        "total_appointments": 0,
        "active_procedures": 0
    }


@router.get("/recent-activity")
async def get_recent_activity():
    """Get recent activity feed"""
    return []


@router.get("/revenue/analytics")
async def get_revenue_analytics():
    """Get revenue analytics"""
    return []


@router.get("/cases/analytics")
async def get_cases_analytics():
    """Get cases analytics"""
    return []
