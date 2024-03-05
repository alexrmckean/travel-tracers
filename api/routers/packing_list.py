from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)

from queries.packing_list import (
    Error,
    PackingListIn,
    PackingListOut,
    PackingListQueries,
)

from typing import Optional, Union, List

router = APIRouter()


@router.post("/api/packing_list", response_model=Union[PackingListOut, Error])
def create_packing_list(
    packing_list: PackingListIn,
    response: Response,
    repo: PackingListQueries = Depends(),
):
    response.status_code = 400
    return repo.create(packing_list)


@router.get("/api/packing_list", response_model=Union[List[PackingListOut], Error])
def get_all(
    repo: PackingListQueries = Depends(),
):
    return repo.get_all()


@router.put("/api/packing_list/{packing_list_id}", response_model=Union[PackingListOut, Error])
def update_packing_list(
    packing_list_id: int,
    packing_list: PackingListIn,
    repo: PackingListQueries = Depends(),
) -> Union[Error, PackingListOut]:
    return repo.update(packing_list_id, packing_list)


@router.delete("/api/packing_list/{packing_list_id}", response_model=bool)
def delete_packing_list(
    packing_list_id: int,
    repo: PackingListQueries = Depends(),
) -> bool:
    return repo.delete(packing_list_id)


@router.get("/api/packing_list/{packing_list_id}", response_model=Optional[PackingListOut])
def get_one_packing_list(
    packing_list_id: int,
    response: Response,
    repo: PackingListQueries = Depends(),
) -> PackingListOut:
    packing_list = repo.get_one(packing_list_id)
    if packing_list is None:
        response.status_code = 404
    return packing_list
