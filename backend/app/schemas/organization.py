from pydantic import BaseModel
from typing import Optional, List

class DepartmentOut(BaseModel):
    id: int
    organization_id: int
    name: str

    class Config:
        from_attributes = True

class OrganizationCreate(BaseModel):
    name: str
    code: str
    org_type: Optional[str] = "College / University"

class OrganizationOut(BaseModel):
    id: int
    name: str
    code: str
    org_type: str
    is_verified: bool
    departments: List[DepartmentOut] = []

    class Config:
        from_attributes = True
