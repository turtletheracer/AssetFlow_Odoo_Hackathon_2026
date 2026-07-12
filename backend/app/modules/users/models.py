import enum
from datetime import datetime
from sqlalchemy import Column, Integer, String, ForeignKey, Enum, DateTime
from app.core.database import Base


class UserRole(str, enum.Enum):
    employee = "employee"
    department_head = "department_head"
    asset_manager = "asset_manager"
    admin = "admin"


class UserStatus(str, enum.Enum):
    active = "active"
    inactive = "inactive"


class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    name = Column(String(150), nullable=False)
    email = Column(String(150), nullable=False, unique=True)
    password_hash = Column(String(255), nullable=False)
    role = Column(Enum(UserRole, name="user_role"), default=UserRole.employee, nullable=False)
    department_id = Column(Integer, ForeignKey("departments.id"))
    status = Column(Enum(UserStatus, name="user_status"), default=UserStatus.active, nullable=False)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)


# from sqlalchemy import (
#     Integer,
#     String,
#     Enum,
#     ForeignKey,
#     TIMESTAMP,
#     func
# )
#
# from sqlalchemy.orm import (
#     Mapped,
#     mapped_column,
#     relationship
# )
#
# from app.models.base import Base
# from app.enums.user_role import UserRole
# from app.enums.user_status import UserStatus
#
#
# class User(Base):
#     __tablename__ = "users"
#
#     id: Mapped[int] = mapped_column(
#         Integer,
#         primary_key=True,
#         index=True
#     )
#
#     name: Mapped[str] = mapped_column(
#         String(150),
#         nullable=False
#     )
#
#     email: Mapped[str] = mapped_column(
#         String(150),
#         unique=True,
#         nullable=False,
#         index=True
#     )
#
#     password_hash: Mapped[str] = mapped_column(
#         String(255),
#         nullable=False
#     )
#
#     role: Mapped[UserRole] = mapped_column(
#         Enum(UserRole, name="user_role"),
#         nullable=False,
#         default=UserRole.EMPLOYEE
#     )
#
#     department_id: Mapped[int | None] = mapped_column(
#         ForeignKey("departments.id"),
#         nullable=True
#     )
#
#     status: Mapped[UserStatus] = mapped_column(
#         Enum(UserStatus, name="user_status"),
#         nullable=False,
#         default=UserStatus.ACTIVE
#     )
#
#     created_at: Mapped[TIMESTAMP] = mapped_column(
#         TIMESTAMP(timezone=True),
#         server_default=func.now()
#     )