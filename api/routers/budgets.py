from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)
from queries.budgets import (
    Error,
    BudgetIn,
    BudgetOut,
    BudgetQueries,
)
from typing import Optional, Union, List
from authenticator import authenticator


router = APIRouter()


@router.post("/api/budgets", response_model=Union[BudgetOut, Error])
def create_budget(
    budget: BudgetIn,
    repo: BudgetQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),

):
    print('Printing out id')
    print(account_data["id"])
    return repo.create(budget)


@router.get("/api/budgets", response_model=Union[List[BudgetOut], Error])
def get_all(
    repo: BudgetQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return repo.get_all()


@router.put("/api/budgets/{budget_id}", response_model=Union[BudgetOut, Error])
def update_budget(
    budget_id: int,
    budget: BudgetIn,
    repo: BudgetQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> Union[Error, BudgetOut]:
    updated_budget = repo.update(budget_id, budget)
    if updated_budget is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    return updated_budget


@router.delete("/api/budgets/{budget_id}", response_model=bool)
def delete_budget(
    budget_id: int,
    repo: BudgetQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> bool:
    deleted = repo.delete(budget_id)
    if not deleted:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    return True


@router.get("/api/budgets/{budget_id}", response_model=Optional[BudgetOut])
def get_one_budget(
    budget_id: int,
    repo: BudgetQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> BudgetOut:
    budget = repo.get_one(budget_id)
    if budget is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    return budget
