from typing import Optional
from pydantic import BaseModel, EmailStr


class UserOut(BaseModel):
    id: int
    name: str
    email: str
    role: str
    department_id: Optional[int]
    status: str

    class Config:
        from_attributes = True


class PromoteRoleRequest(BaseModel):
    user_id: int
    new_role: str  # "department_head" or "asset_manager"
