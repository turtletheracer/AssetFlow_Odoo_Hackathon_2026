import enum
from datetime import datetime, date
from sqlalchemy import Column, Integer, Text, Date, DateTime, ForeignKey, Enum, CheckConstraint
from app.core.database import Base


class AllocationStatus(str, enum.Enum):
    active = "active"
    returned = "returned"


class TransferStatus(str, enum.Enum):
    requested = "requested"
    approved = "approved"
    rejected = "rejected"
    completed = "completed"


class Allocation(Base):
    __tablename__ = "allocations"
    id = Column(Integer, primary_key=True)
    asset_id = Column(Integer, ForeignKey("assets.id"), nullable=False)
    employee_id = Column(Integer, ForeignKey("users.id"))
    department_id = Column(Integer, ForeignKey("departments.id"))
    allocated_date = Column(Date, default=date.today, nullable=False)
    expected_return_date = Column(Date)
    returned_date = Column(Date)
    condition_check_in_notes = Column(Text)
    status = Column(Enum(AllocationStatus, name="allocation_status"), default=AllocationStatus.active, nullable=False)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)

    __table_args__ = (
        CheckConstraint("employee_id IS NOT NULL OR department_id IS NOT NULL", name="ck_allocation_target"),
    )


class TransferRequest(Base):
    __tablename__ = "transfer_requests"
    id = Column(Integer, primary_key=True)
    asset_id = Column(Integer, ForeignKey("assets.id"), nullable=False)
    from_holder_id = Column(Integer, ForeignKey("users.id"))
    to_holder_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    requested_by = Column(Integer, ForeignKey("users.id"), nullable=False)
    approved_by = Column(Integer, ForeignKey("users.id"))
    status = Column(Enum(TransferStatus, name="transfer_status"), default=TransferStatus.requested, nullable=False)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)
    resolved_at = Column(DateTime(timezone=True))
