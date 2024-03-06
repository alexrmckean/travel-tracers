from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)

from queries.accommodations import (
    Error,
    AccommodationsIn,
    AccommodationsOut,
    AccommodationsQueries,
)

from typing import Optional, Union, List


router = APIRouter()


@router.post("/api/accommodations", response_model=Union[AccommodationsOut, Error])
def create_accommodations(
    accommodations: AccommodationsIn,
    response: Response,
    repo: AccommodationsQueries = Depends(),
):
    response.status_code = 400
    return repo.create(accommodations)


@router.get("/api/accommodations/{accommodations_id}", response_model=Optional[AccommodationsOut])
def get_one_accommodations(
    accommodations_id: int,
    response: Response,
    repo: AccommodationsQueries = Depends(),
) -> AccommodationsOut:
    accommodations = repo.get_one(accommodations_id)
    if accommodations is None:
        response.status_code = 404
    return accommodations


@router.get("/api/accommodations", response_model=Union[List[AccommodationsOut], Error])
def get_all(
    repo: AccommodationsQueries = Depends(),
):
    return repo.get_all()


@router.put("/api/accommodations/{accommodations_id}", response_model=Union[AccommodationsOut, Error])
def update_accommodations(
    accommodations_id: int,
    accommodations: AccommodationsIn,
    repo: AccommodationsQueries = Depends(),
) -> Union[Error, AccommodationsOut]:
    return repo.update(accommodations_id, accommodations)


@router.delete("/api/accommodations/{accommodations_id}", response_model=bool)
def delete_accommodations(
    accommodations_id: int,
    repo: AccommodationsQueries = Depends(),
) -> bool:
    return repo.delete(accommodations_id)
