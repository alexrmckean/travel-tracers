from fastapi.testclient import TestClient
from main import app
from queries.packing_list import PackingListQueries
from datetime import date
from authenticator import authenticator


client = TestClient(app=app)


class FakePackingListQueries:
    def get_all(self):
        return [
            {
                "id": 1,
                "item": "Updated Item",
                "quantity": 10,
                "category": "Updated Category",
                "priority": 2,
                "checklist_status": False,
                "notes": "Updated Notes",
                "deadline": date(2023, 1, 1).isoformat(),
            },
        ]


def fakeAccountData():
    return {
        "id": 1,
        "email": "string@string.com",
    }


def test_get_all():
    # Arrange
    app.dependency_overrides[PackingListQueries] = FakePackingListQueries
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fakeAccountData
    # Act
    res = client.get("/api/packing_list")
    data = res.json()
    # Assert
    assert res.status_code == 200
    assert data == [
        {
            "id": 1,
            "item": "Updated Item",
            "quantity": 10,
            "category": "Updated Category",
            "priority": 2,
            "checklist_status": False,
            "notes": "Updated Notes",
            "deadline": date(2023, 1, 1).isoformat(),
        },
    ]
