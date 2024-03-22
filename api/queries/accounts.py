from pydantic import BaseModel
from jwtdown_fastapi.authentication import Token
from queries.pool import pool
from typing import Optional


class DuplicateAccountError(ValueError):
    pass


class AccountIn(BaseModel):
    email: str
    password: str
    full_name: str


class AccountOut(BaseModel):
    id: str
    email: str
    full_name: str


class AccountToken(Token):
    account: AccountOut


class AccountOutWithPassword(AccountOut):
    hashed_password: str


class AccountQueries:
    def get(self, email: str) -> Optional[AccountOutWithPassword]:
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT *
                        FROM accounts
                        WHERE email = %s
                        """,
                        [email],
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_account_out(record)
        except Exception as e:
            print(e)
            return {"message": "Could not get that account"}

    def create(
        self, info: AccountIn, hashed_password: str
    ) -> AccountOutWithPassword:
        with pool.connection() as conn:
            # get a cursor (something to run SQL with)
            with conn.cursor() as db:
                # Run our INSERT statement
                result = db.execute(
                    """
                    INSERT INTO accounts
                        (
                            email,
                            password,
                            full_name
                        )
                    VALUES
                        (%s, %s, %s)
                    RETURNING id, email, password, full_name;
                    """,
                    [info.email, hashed_password, info.full_name],
                )
                id = result.fetchone()[0]
                # Return new data
                old_data = info.dict()
                return AccountOutWithPassword(
                    id=id, hashed_password=hashed_password, **old_data
                )

    def record_to_account_out(self, record):
        return AccountOutWithPassword(
            id=record[0],
            email=record[1],
            hashed_password=record[2],
            full_name=record[3],
        )
