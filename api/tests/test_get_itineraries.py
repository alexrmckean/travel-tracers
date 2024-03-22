from fastapi.testclient import TestClient
from main import app
from routers.itinerary import ItineraryQueries

client = TestClient(app=app)


class ItinerariesQueriesMock:
    def get_all(self):
        return [
            {
                "id": 1,
                "name": "Beach Trip",
                "destination": "the new one",
                "from_date": "2024-04-09",
                "to_date": "2024-04-16",
                "num_travelers": "5",
            },
        ]


def test_get_all():
    app.dependency_overrides[ItineraryQueries] = ItinerariesQueriesMock

    res = client.get("/api/itinerary")

    assert res.status_code == 200

    assert res.json() == [
        {
            "id": 1,
            "name": "Beach Trip",
            "destination": "the new one",
            "from_date": "2024-04-09",
            "to_date": "2024-04-16",
            "num_travelers": "5",
        },
    ]
