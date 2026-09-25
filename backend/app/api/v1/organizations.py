from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.api.deps import get_db, get_current_user
from app.models.organization import Organization, Department
from app.schemas.organization import OrganizationOut, DepartmentOut, OrganizationCreate
from app.models.user import User

router = APIRouter(prefix="/organizations", tags=["Organizations"])

@router.get("/", response_model=List[OrganizationOut])
def list_organizations(db: Session = Depends(get_db)):
    orgs = db.query(Organization).filter(Organization.is_verified == True).all()
    res = []
    for o in orgs:
        depts = [DepartmentOut(id=d.id, organization_id=d.organization_id, name=d.name) for d in o.departments]
        res.append(OrganizationOut(
            id=o.id,
            name=o.name,
            code=o.code,
            org_type=o.org_type,
            is_verified=o.is_verified,
            departments=depts
        ))
    return res

@router.post("/", response_model=OrganizationOut, status_code=status.HTTP_201_CREATED)
def create_organization(
    org_in: OrganizationCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    existing = db.query(Organization).filter(Organization.code == org_in.code).first()
    if existing:
        raise HTTPException(status_code=400, detail="Organization code already exists")

    org = Organization(
        name=org_in.name,
        code=org_in.code,
        org_type=org_in.org_type,
        is_verified=True
    )
    db.add(org)
    db.commit()
    db.refresh(org)
    return OrganizationOut(
        id=org.id,
        name=org.name,
        code=org.code,
        org_type=org.org_type,
        is_verified=org.is_verified,
        departments=[]
    )

@router.get("/{org_id}/departments", response_model=List[DepartmentOut])
def list_departments(org_id: int, db: Session = Depends(get_db)):
    depts = db.query(Department).filter(Department.organization_id == org_id).all()
    return [DepartmentOut(id=d.id, organization_id=d.organization_id, name=d.name) for d in depts]
