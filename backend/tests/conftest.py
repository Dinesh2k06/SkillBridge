import os
import sys

# Set DATABASE_URL to a file-based test SQLite DB
os.environ["DATABASE_URL"] = "sqlite:///./test_db.db"
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import pytest
from fastapi.testclient import TestClient
import app.core.database as db_module
from app.core.database import Base, get_db
from app.main import app

@pytest.fixture(scope="function", autouse=True)
def setup_db():
    Base.metadata.drop_all(bind=db_module.engine)
    Base.metadata.create_all(bind=db_module.engine)
    yield
    Base.metadata.drop_all(bind=db_module.engine)

@pytest.fixture(scope="function")
def db():
    db_session = db_module.SessionLocal()
    try:
        yield db_session
    finally:
        db_session.close()

@pytest.fixture(scope="function")
def client(db):
    def override_get_db():
        try:
            yield db
        finally:
            pass
    
    app.dependency_overrides[get_db] = override_get_db
    with TestClient(app) as test_client:
        yield test_client
    app.dependency_overrides.clear()
