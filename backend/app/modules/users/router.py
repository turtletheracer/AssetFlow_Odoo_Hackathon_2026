from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.api.dependencies import require_role
from app.modules.users import service
from app.modules.users.schemas import UserOut, PromoteRoleRequest

router = APIRouter()


@router.get("/", response_model=list[UserOut])
async def list_employees(db: AsyncSession = Depends(get_db)):
    return await service.list_employees(db)


@router.post("/promote", response_model=UserOut, dependencies=[Depends(require_role("admin"))])
async def promote_employee(payload: PromoteRoleRequest, db: AsyncSession = Depends(get_db)):
    return await service.promote_user(db, payload.user_id, payload.new_role)
