import enum
from datetime import datetime, date
from sqlalchemy import Column, Integer, String, Text, Date, DateTime, ForeignKey, Enum, UniqueConstraint
from app.core.database import Base


class AuditStatus(str, enum.Enum):
    planned = "planned"
    in_progress = "in_progress"
    closed = "closed"


class AuditResult(str, enum.Enum):
    verified = "verified"
    missing = "missing"
    damaged = "damaged"


class AuditCycle(Base):
    __tablename__ = "audit_cycles"
    id = Column(Integer, primary_key=True)
    name = Column(String(150), nullable=False)
    scope_department_id = Column(Integer, ForeignKey("departments.id"))
    scope_location = Column(String(150))
    start_date = Column(Date, nullable=False)
    end_date = Column(Date, nullable=False)
    status = Column(Enum(AuditStatus, name="audit_status"), default=AuditStatus.planned, nullable=False)
    created_by = Column(Integer, ForeignKey("users.id"), nullable=False)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)
    closed_at = Column(DateTime(timezone=True))


class AuditCycleAuditor(Base):
    __tablename__ = "audit_cycle_auditors"
    id = Column(Integer, primary_key=True)
    audit_cycle_id = Column(Integer, ForeignKey("audit_cycles.id"), nullable=False)
    auditor_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    __table_args__ = (UniqueConstraint("audit_cycle_id", "auditor_id"),)


class AuditItem(Base):
    __tablename__ = "audit_items"
    id = Column(Integer, primary_key=True)
    audit_cycle_id = Column(Integer, ForeignKey("audit_cycles.id"), nullable=False)
    asset_id = Column(Integer, ForeignKey("assets.id"), nullable=False)
    auditor_id = Column(Integer, ForeignKey("users.id"))
    result = Column(Enum(AuditResult, name="audit_result"))
    notes = Column(Text)
    checked_at = Column(DateTime(timezone=True))

    __table_args__ = (UniqueConstraint("audit_cycle_id", "asset_id"),)
