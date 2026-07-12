from typing import Optional
from pydantic import BaseModel


class DepartmentCreate(BaseModel):
    name: str
    head_id: Optional[int] = None
    parent_department_id: Optional[int] = None


class DepartmentUpdate(BaseModel):
    name: Optional[str] = None
    head_id: Optional[int] = None
    parent_department_id: Optional[int] = None
    status: Optional[str] = None


class DepartmentOut(BaseModel):
    id: int
    name: str
    head_id: Optional[int]
    parent_department_id: Optional[int]
    status: str

    class Config:
        from_attributes = True
