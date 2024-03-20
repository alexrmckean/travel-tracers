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
from authenticator import authenticator


router = APIRouter()


@router.post("/api/accommodations", response_model=Union[AccommodationsOut, Error])
def create_accommodations(
    accommodations: AccommodationsIn,
    repo: AccommodationsQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return repo.create(accommodations)


@router.get("/api/accommodations/{accommodations_id}", response_model=Optional[AccommodationsOut])
def get_one_accommodations(
    accommodations_id: int,
    response: Response,
    repo: AccommodationsQueries = Depends(),
) -> AccommodationsOut:
    accommodations = repo.get_one(accommodations_id)
    if accommodations is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    return accommodations


@router.get("/api/accommodations", response_model=Union[List[AccommodationsOut], Error])
def get_all(
    repo: AccommodationsQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),

):
    return repo.get_all()


@router.put("/api/accommodations/{accommodations_id}", response_model=Union[AccommodationsOut, Error])
def update_accommodations(
    accommodations_id: int,
    accommodations: AccommodationsIn,
    repo: AccommodationsQueries = Depends(),
) -> Union[Error, AccommodationsOut]:
    updated_accommodations = repo.update(accommodations_id, accommodations)
    if updated_accommodations is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    return updated_accommodations


@router.delete("/api/accommodations/{accommodations_id}", response_model=bool)
def delete_accommodations(
    accommodations_id: int,
    repo: AccommodationsQueries = Depends(),
) -> bool:
    deleted = repo.delete(accommodations_id)
    if not deleted:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    return True
