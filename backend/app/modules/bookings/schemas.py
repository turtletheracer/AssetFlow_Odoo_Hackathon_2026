from datetime import datetime
from pydantic import BaseModel


class BookingCreate(BaseModel):
    asset_id: int
    start_time: datetime
    end_time: datetime


class BookingOut(BaseModel):
    id: int
    asset_id: int
    booked_by: int
    start_time: datetime
    end_time: datetime
    status: str

    class Config:
        from_attributes = True
