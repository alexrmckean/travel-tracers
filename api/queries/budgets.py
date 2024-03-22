from pydantic import BaseModel
from typing import Optional, Union, List
from datetime import date
from queries.pool import pool


class Error(BaseModel):
    message: str


class BudgetIn(BaseModel):
    description: Optional[str]
    amount: float
    date: date
    payment_method: str


class BudgetOut(BaseModel):
    id: int
    description: Optional[str]
    amount: float
    date: date
    payment_method: str


class BudgetQueries:
    def get_one(self, budget_id: int) -> Optional[BudgetOut]:
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    # Run our SELECT statement
                    result = db.execute(
                        """
                        SELECT id
                                , description
                                , amount
                                , date
                                , payment_method
                        FROM budgets
                        WHERE id = %s
                        """,
                        [budget_id],
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_budget_out(record)
        except Exception as e:
            print(e)
            return {"message": "Could not get that budget"}

    def delete(self, budget_id: int) -> bool:
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM budgets
                        WHERE id = %s
                        """,
                        [budget_id],
                    )
                    return True
        except Exception as e:
            print(e)
            return False

    def update(
        self, budget_id: int, budget: BudgetIn
    ) -> Union[BudgetOut, Error]:
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE budgets
                        SET description = %s
                            , amount = %s
                            , date = %s
                            , payment_method = %s
                        WHERE id = %s
                        """,
                        [
                            budget.description,
                            budget.amount,
                            budget.date,
                            budget.payment_method,
                            budget_id,
                        ],
                    )
                    # old_data = vacation.dict()
                    # return VacationOut(id=vacation_id, **old_data)
                    return self.budget_in_to_out(budget_id, budget)
        except Exception as e:
            print(e)
            return {"message": "Could not update that budget"}

    def get_all(self) -> Union[Error, List[BudgetOut]]:
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    # Run our SELECT statement
                    result = db.execute(
                        """
                        SELECT id, description, amount, date, payment_method
                        FROM budgets
                        ORDER BY date;
                        """
                    )
                    return [
                        self.record_to_budget_out(record) for record in result
                    ]
        except Exception as e:
            print(e)
            return {"message": "Could not get all budgets"}

    def create(self, budget: BudgetIn) -> Union[BudgetOut, Error]:
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    # Run our INSERT statement
                    result = db.execute(
                        """
                        INSERT INTO budgets
                            (description, amount, date, payment_method)
                        VALUES
                            (%s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            budget.description,
                            budget.amount,
                            budget.date,
                            budget.payment_method,
                        ],
                    )
                    id = result.fetchone()[0]
                    return self.budget_in_to_out(id, budget)
        except Exception:
            return {"message": "Create did not work"}

    def budget_in_to_out(self, id: int, budget: BudgetIn):
        old_data = budget.dict()
        return BudgetOut(id=id, **old_data)

    def record_to_budget_out(self, record):
        return BudgetOut(
            id=record[0],
            description=record[1],
            amount=record[2],
            date=record[3],
            payment_method=record[4],
        )
