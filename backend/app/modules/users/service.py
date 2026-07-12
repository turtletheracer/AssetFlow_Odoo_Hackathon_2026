from sqlalchemy.ext.asyncio import AsyncSession

from app.modules.users import repository
from app.modules.users.models import User, UserRole
from app.core.exceptions import NotFoundError, ConflictError


async def list_employees(db: AsyncSession) -> list[User]:
    return await repository.list_all(db)


async def promote_user(db: AsyncSession, user_id: int, new_role: str) -> User:
    """This is the ONLY place roles get assigned — no self-elevation at signup."""
    if new_role not in ("department_head", "asset_manager"):
        raise ConflictError("Can only promote to department_head or asset_manager")

    user = await repository.get_by_id(db, user_id)
    if not user:
        raise NotFoundError("User not found")

    user.role = UserRole(new_role)
    await db.commit()
    await db.refresh(user)
    return user
