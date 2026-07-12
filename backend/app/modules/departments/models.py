from datetime import datetime
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Enum
from app.core.database import Base
from app.modules.users.models import UserStatus  # reuse active/inactive enum


class Department(Base):
    __tablename__ = "departments"
    id = Column(Integer, primary_key=True)
    name = Column(String(150), nullable=False)
    head_id = Column(Integer, ForeignKey("users.id"))
    parent_department_id = Column(Integer, ForeignKey("departments.id"))
    status = Column(Enum(UserStatus, name="user_status"), default=UserStatus.active, nullable=False)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)
