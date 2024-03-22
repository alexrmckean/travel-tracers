from fastapi.testclient import TestClient
from main import app
from routers.accommodations import AccommodationsQueries
from authenticator import authenticator

client = TestClient(app=app)


def fakeAccountData():
    return {
        "id": 1,
        "email": "string@string.com",
    }


class AccommodationsQueriesMock:
    def get_all(self):
        return [
            {
                "id": 1,
                "hotel": "the new one",
                "flight_number": "testing123",
                "flight_number_2": "321",
                "from_date": "2024-03-29",
                "to_date": "2024-03-29",
                "notes": "no new notes",
            },
        ]


def test_get_all():
    app.dependency_overrides[AccommodationsQueries] = AccommodationsQueriesMock
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fakeAccountData

    res = client.get("/api/accommodations")

    assert res.status_code == 200

    assert res.json() == [
        {
            "id": 1,
            "hotel": "the new one",
            "flight_number": "testing123",
            "flight_number_2": "321",
            "from_date": "2024-03-29",
            "to_date": "2024-03-29",
            "notes": "no new notes",
        },
    ]
