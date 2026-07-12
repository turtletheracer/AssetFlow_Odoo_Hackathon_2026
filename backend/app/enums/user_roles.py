from enum import Enum


class UserRole(str, Enum):
    EMPLOYEE = "employee"
    DEPARTMENT_HEAD = "department_head"
    ASSET_MANAGER = "asset_manager"
    ADMIN = "admin"