from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.api.dependencies import get_current_user
from app.modules.auth import service
from app.modules.auth.schemas import SignupRequest, LoginRequest, TokenResponse
from app.modules.users.schemas import UserOut
from app.modules.users.models import User

router = APIRouter()


@router.post("/signup", response_model=UserOut)
async def signup(payload: SignupRequest, db: AsyncSession = Depends(get_db)):
    return await service.signup(db, payload.name, payload.email, payload.password)


@router.post("/login", response_model=TokenResponse)
async def login(payload: LoginRequest, db: AsyncSession = Depends(get_db)):
    token = await service.login(db, payload.email, payload.password)
    return TokenResponse(access_token=token)


@router.get("/me", response_model=UserOut)
async def get_me(current_user: User = Depends(get_current_user)):
    return current_user
