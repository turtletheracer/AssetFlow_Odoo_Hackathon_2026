from sqlalchemy.ext.asyncio import AsyncSession

from app.modules.users import repository as user_repo
from app.modules.users.models import UserRole
from app.core.security import hash_password, verify_password, create_access_token
from app.core.exceptions import ConflictError, UnauthorizedError, ForbiddenError


async def signup(db: AsyncSession, name: str, email: str, password: str):
    existing = await user_repo.get_by_email(db, email)
    if existing:
        raise ConflictError("Email already registered")

    # Signup always creates an Employee — no role selection at signup.
    # Roles are only changed later via users/promote (admin-only).
    user = await user_repo.create(
        db, name=name, email=email,
        password_hash=hash_password(password), role=UserRole.employee,
    )
    await db.commit()
    await db.refresh(user)
    return user


async def login(db: AsyncSession, email: str, password: str) -> str:
    user = await user_repo.get_by_email(db, email)
    if not user or not verify_password(password, user.password_hash):
        raise UnauthorizedError("Invalid email or password")
    if user.status.value != "active":
        raise ForbiddenError("Account is inactive")

    return create_access_token({"sub": str(user.id)})
