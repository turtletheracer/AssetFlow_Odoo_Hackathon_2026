from datetime import date
from typing import Optional
from pydantic import BaseModel


class AssetCreate(BaseModel):
    name: str
    category_id: int
    serial_number: Optional[str] = None
    acquisition_date: Optional[date] = None
    acquisition_cost: Optional[float] = None
    condition: Optional[str] = "good"
    location: Optional[str] = None
    is_bookable: bool = False
    department_id: Optional[int] = None


class AssetOut(BaseModel):
    id: int
    tag: str
    name: str
    category_id: int
    serial_number: Optional[str]
    acquisition_date: Optional[date]
    acquisition_cost: Optional[float]
    condition: Optional[str]
    location: Optional[str]
    is_bookable: bool
    status: str
    department_id: Optional[int]
    current_holder_id: Optional[int]

    class Config:
        from_attributes = True


class AssetStatusUpdate(BaseModel):
    new_status: str
