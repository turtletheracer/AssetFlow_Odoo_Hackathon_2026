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
