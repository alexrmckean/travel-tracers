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
from typing import Union, Optional, List


router = APIRouter()

@router.post("/api/itinerary", response_model=Union[ItineraryOut, Error])
def create_itinerary(
    itinerary: ItineraryIn,
    response: Response,
    repo: ItineraryQueries = Depends(),
):
    response.status_code = 400
    return repo.create(itinerary)

@router.get("/api/itinerary", response_model=Union[List[ItineraryOut], Error])
def get_all(
    repo: ItineraryQueries = Depends(),
):
    return repo.get_all()


@router.get("/api/itinerary/{id}", response_model=Optional[ItineraryOut])
def get_itinerary(
    id: int,
    response: Response,
    repo: ItineraryQueries = Depends(),
) -> ItineraryOut:
    itinerary = repo.get(id)
    if itinerary is None:
        response.status_code = 404
    return itinerary


@router.delete("/api/itinerary/{id}", response_model=bool)
def delete_itinerary(
    id: int,
    repo: ItineraryQueries = Depends(),
) -> bool:
    return repo.delete(id)


@router.put("/itinerary{id}", response_model=Union[ItineraryOut, Error])
def update_itinerary(
    id: int,
    itinerary: ItineraryIn,
    repo: ItineraryQueries = Depends(),
) -> Union[Error, ItineraryOut]:
    return repo.update(id, itinerary)
