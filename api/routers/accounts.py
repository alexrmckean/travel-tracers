from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)
from jwtdown_fastapi.authentication import Token
from authenticator import authenticator
from typing import Optional
from pydantic import BaseModel
from queries.accounts import (
    AccountIn,
    AccountOut,
    Queries,
    DuplicateAccountError,
)
import logging

logger = logging.getLogger(__name__)

class AccountForm(BaseModel):
    username: str
    password: str

class AccountToken(Token):
    account: AccountOut

class HttpError(BaseModel):
    detail: str

router = APIRouter()


@router.post("/api/accounts", response_model=AccountToken | HttpError)
async def create_account(
    info: AccountIn,
    request: Request,
    response: Response,
    accounts: Queries = Depends(),
):
    logger.info(f"Received data: {info}")

    hashed_password = authenticator.hash_password(info.password)
    logger.info(f"Hashed password: {hashed_password}")
    try:
        account = accounts.create(info, hashed_password)
    except DuplicateAccountError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an account with those credentials",
        )
    logger.info(f"Account created: {account}")

    form = AccountForm(username=info.email, password=info.password)
    logger.info(f"Account form: {form}")
    token = await authenticator.login(response, request, form, accounts)
    logger.info(f"Generated token: {token}")
    return AccountToken(account=account, **token.dict())
