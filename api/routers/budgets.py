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

router = APIRouter()


@router.post("/api/budgets", response_model=Union[BudgetOut, Error])
def create_budget(
    budget: BudgetIn,
    response: Response,
    repo: BudgetQueries = Depends(),
):
    response.status_code = 400
    return repo.create(budget)

@router.get("/api/budgets", response_model=Union[List[BudgetOut], Error])
def get_all(
    repo: BudgetQueries = Depends(),
):
    return repo.get_all()


@router.put("/api/budgets/{budget_id}", response_model=Union[BudgetOut, Error])
def update_budget(
    budget_id: int,
    budget: BudgetIn,
    repo: BudgetQueries = Depends(),
) -> Union[Error, BudgetOut]:
    return repo.update(budget_id, budget)


@router.delete("/api/budgets/{budget_id}", response_model=bool)
def delete_budget(
    budget_id: int,
    repo: BudgetQueries = Depends(),
) -> bool:
    return repo.delete(budget_id)


@router.get("/api/budgets/{budget_id}", response_model=Optional[BudgetOut])
def get_one_budget(
    budget_id: int,
    response: Response,
    repo: BudgetQueries = Depends(),
) -> BudgetOut:
    budget = repo.get_one(budget_id)
    if budget is None:
        response.status_code = 404
    return budget
