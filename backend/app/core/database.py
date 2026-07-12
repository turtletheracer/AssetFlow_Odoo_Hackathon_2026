from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.orm import declarative_base

from app.core.config import settings

DATABASE_URL = settings.DATABASE_URL

# Neon gives: postgresql://user:pass@host/db?sslmode=require
# asyncpg needs the +asyncpg driver and ssl passed separately, not in the URL.
if DATABASE_URL.startswith("postgresql://"):
    DATABASE_URL = DATABASE_URL.replace("postgresql://", "postgresql+asyncpg://", 1)

connect_args = {}
if "sslmode=require" in DATABASE_URL:
    DATABASE_URL = DATABASE_URL.split("?")[0]
    connect_args = {"ssl": "require"}

engine = create_async_engine(DATABASE_URL, echo=False, connect_args=connect_args)
AsyncSessionLocal = async_sessionmaker(engine, expire_on_commit=False)

Base = declarative_base()


async def get_db():
    async with AsyncSessionLocal() as session:
        yield session