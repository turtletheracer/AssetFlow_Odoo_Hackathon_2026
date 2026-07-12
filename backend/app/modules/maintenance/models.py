import enum
from datetime import datetime, date
from sqlalchemy import Column, Integer, String, Text, Date, DateTime, ForeignKey, Enum
from app.core.database import Base


class MaintenanceStatus(str, enum.Enum):
    pending = "pending"
    approved = "approved"
    rejected = "rejected"
    technician_assigned = "technician_assigned"
    in_progress = "in_progress"
    resolved = "resolved"


class PriorityLevel(str, enum.Enum):
    low = "low"
    medium = "medium"
    high = "high"
    critical = "critical"


class MaintenanceRequest(Base):
    __tablename__ = "maintenance_requests"
    id = Column(Integer, primary_key=True)
    asset_id = Column(Integer, ForeignKey("assets.id"), nullable=False)
    raised_by = Column(Integer, ForeignKey("users.id"), nullable=False)
    issue_description = Column(Text, nullable=False)
    priority = Column(Enum(PriorityLevel, name="priority_level"), default=PriorityLevel.medium, nullable=False)
    status = Column(Enum(MaintenanceStatus, name="maintenance_status"), default=MaintenanceStatus.pending, nullable=False)
    approved_by = Column(Integer, ForeignKey("users.id"))
    technician_name = Column(String(150))
    resolved_date = Column(Date)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)
