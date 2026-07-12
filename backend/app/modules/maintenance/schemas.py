from datetime import date
from typing import Optional
from pydantic import BaseModel


class MaintenanceCreate(BaseModel):
    asset_id: int
    issue_description: str
    priority: str = "medium"


class MaintenanceOut(BaseModel):
    id: int
    asset_id: int
    raised_by: int
    issue_description: str
    priority: str
    status: str
    approved_by: Optional[int]
    technician_name: Optional[str]
    resolved_date: Optional[date]

    class Config:
        from_attributes = True


class MaintenanceDecision(BaseModel):
    approve: bool  # True = approve, False = reject


class TechnicianAssignRequest(BaseModel):
    technician_name: str
