from fastapi import (
    Depends,
    Response,
    APIRouter,
    HTTPException,
    status,
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
    repo: ItineraryQueries = Depends(),
):
    created_itinerary = repo.create(itinerary)
    if created_itinerary is None:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST)
    return created_itinerary

@router.get("/api/itinerary", response_model=Union[List[ItineraryOut], Error])
def get_all(
    repo: ItineraryQueries = Depends(),
):
    return repo.get_all()

@router.get("/api/itinerary/{id}", response_model=Optional[ItineraryOut])
def get_itinerary(
    id: int,
    repo: ItineraryQueries = Depends(),
) -> ItineraryOut:
    itinerary = repo.get(id)
    if itinerary is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    return itinerary

@router.delete("/api/itinerary/{id}", response_model=bool)
def delete_itinerary(
    id: int,
    repo: ItineraryQueries = Depends(),
) -> bool:
    deleted = repo.delete(id)
    if not deleted:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    return True

@router.put("/api/itinerary/{id}", response_model=Union[ItineraryOut, Error])
def update_itinerary(
    id: int,
    itinerary: ItineraryIn,
    repo: ItineraryQueries = Depends(),
) -> Union[Error, ItineraryOut]:
    updated_itinerary = repo.update(id, itinerary)
    if updated_itinerary is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    return updated_itinerary
