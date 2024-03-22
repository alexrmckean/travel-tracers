from fastapi.testclient import TestClient
from main import app
from routers.itinerary import ItineraryQueries, ItineraryOut

client = TestClient(app=app)


def fakeAccountData():
    return {
        "id": 1,
        "email": "test@string.com",
    }


class ItineraryQueriesMock:
    def get(self, itinerary_id: int):
        return ItineraryOut(
            id=itinerary_id,
            name="School Trip",
            destination="Spain",
            from_date="2024-04-07",
            to_date="2024-04-17",
            num_travelers="3",
        )


def test_get_one_itinerary():

    app.dependency_overrides[ItineraryQueries] = ItineraryQueriesMock

    res = client.get("/api/itinerary/1")

    assert res.status_code == 200

    assert res.json() == {
        "id": 1,
        "name": "School Trip",
        "destination": "Spain",
        "from_date": "2024-04-07",
        "to_date": "2024-04-17",
        "num_travelers": "3",
    }
