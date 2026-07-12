from datetime import date, datetime
from typing import Optional
from pydantic import BaseModel


class AuditCycleCreate(BaseModel):
    name: str
    scope_department_id: Optional[int] = None
    scope_location: Optional[str] = None
    start_date: date
    end_date: date
    auditor_ids: list[int] = []
    asset_ids: list[int] = []  # assets in scope for this cycle


class AuditCycleOut(BaseModel):
    id: int
    name: str
    scope_department_id: Optional[int]
    scope_location: Optional[str]
    start_date: date
    end_date: date
    status: str
    created_by: int

    class Config:
        from_attributes = True


class AuditItemOut(BaseModel):
    id: int
    audit_cycle_id: int
    asset_id: int
    auditor_id: Optional[int]
    result: Optional[str]
    notes: Optional[str]

    class Config:
        from_attributes = True


class AuditItemResult(BaseModel):
    asset_id: int
    result: str  # verified | missing | damaged
    notes: Optional[str] = None
