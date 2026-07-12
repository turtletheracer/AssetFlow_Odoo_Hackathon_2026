import enum
from datetime import datetime, date
from sqlalchemy import Column, Integer, String, Text, Boolean, Date, DateTime, ForeignKey, Numeric, Enum
from app.core.database import Base


class AssetStatus(str, enum.Enum):
    available = "available"
    allocated = "allocated"
    reserved = "reserved"
    under_maintenance = "under_maintenance"
    lost = "lost"
    retired = "retired"
    disposed = "disposed"


class Asset(Base):
    __tablename__ = "assets"
    id = Column(Integer, primary_key=True)
    tag = Column(String(20), nullable=False, unique=True)
    name = Column(String(150), nullable=False)
    category_id = Column(Integer, ForeignKey("asset_categories.id"))
    serial_number = Column(String(100))
    acquisition_date = Column(Date)
    acquisition_cost = Column(Numeric(12, 2))
    condition = Column(String(50), default="good")
    location = Column(String(150))
    is_bookable = Column(Boolean, default=False, nullable=False)
    status = Column(Enum(AssetStatus, name="asset_status"), default=AssetStatus.available, nullable=False)
    department_id = Column(Integer, ForeignKey("departments.id"))
    current_holder_id = Column(Integer, ForeignKey("users.id"))
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)
