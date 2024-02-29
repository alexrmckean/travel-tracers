from authenticator import authenticator
from fastapi import APIRouter, Depends
from typing import Optional

router = APIRouter()


@router.post("/api/things")
async def create_thing(
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    pass


#home page(?)
@router.get("/api/things")
async def get_things(
    account_data: Optional[dict] = Depends(authenticator.try_get_current_account_data),
):
    if account_data:
        return personalized_list
    return general_list
