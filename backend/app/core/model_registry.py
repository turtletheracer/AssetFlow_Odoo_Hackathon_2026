"""
Import every model here so SQLAlchemy's declarative registry is fully
populated before the app starts. This matters for:
  - Alembic autogenerate (if you add it later)
  - Any cross-module relationship() you add later
  - Catching typos in ForeignKey("table.column") strings early

Import this module once, early, from app/main.py (already wired up).
Nothing needs to be exported — the import side-effects are the point.
"""
from app.modules.users.models import User  # noqa: F401
from app.modules.departments.models import Department  # noqa: F401
from app.modules.asset_categories.models import AssetCategory  # noqa: F401
from app.modules.assets.models import Asset  # noqa: F401
from app.modules.allocations.models import Allocation, TransferRequest  # noqa: F401
from app.modules.bookings.models import Booking  # noqa: F401
from app.modules.maintenance.models import MaintenanceRequest  # noqa: F401
from app.modules.audits.models import AuditCycle, AuditCycleAuditor, AuditItem  # noqa: F401
from app.modules.notifications.models import Notification  # noqa: F401
from app.modules.logs.models import ActivityLog  # noqa: F401
