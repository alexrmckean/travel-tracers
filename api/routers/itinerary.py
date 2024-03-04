from fastapi import (
    Depends,
    Response,
    APIRouter,
)
from queries.itinerary import (
    ItineraryIn,
    ItineraryOut,
    ItineraryQueries,
    Error,
)
from typing import Union, Optional


router = APIRouter()

@router.post("/itinerary", response_model=Union[ItineraryOut, Error])
def create_itinerary(
    itinerary: ItineraryIn,
    response: Response,
    repo: ItineraryQueries = Depends(),
):
    response.status_code = 400
    return repo.create(itinerary)


@router.get("/itinerary/{itinerary_id}", response_model=Optional[ItineraryOut])
def get_interary(
    itinerary_id: int,
    response: Response,
    repo: ItineraryQueries = Depends(),
) -> ItineraryOut:
    itinerary = repo.get(itinerary_id)
    if itinerary is None:
        response.status_code = 404
    return itinerary
