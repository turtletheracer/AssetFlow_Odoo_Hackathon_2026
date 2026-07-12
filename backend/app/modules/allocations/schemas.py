from datetime import date, datetime
from typing import Optional
from pydantic import BaseModel


class AllocationCreate(BaseModel):
    asset_id: int
    employee_id: Optional[int] = None
    department_id: Optional[int] = None
    expected_return_date: Optional[date] = None


class AllocationOut(BaseModel):
    id: int
    asset_id: int
    employee_id: Optional[int]
    department_id: Optional[int]
    allocated_date: date
    expected_return_date: Optional[date]
    returned_date: Optional[date]
    status: str

    class Config:
        from_attributes = True


class ReturnAssetRequest(BaseModel):
    condition_check_in_notes: Optional[str] = None


class TransferRequestCreate(BaseModel):
    asset_id: int
    to_holder_id: int


class TransferRequestOut(BaseModel):
    id: int
    asset_id: int
    from_holder_id: Optional[int]
    to_holder_id: int
    requested_by: int
    approved_by: Optional[int]
    status: str

    class Config:
        from_attributes = True
