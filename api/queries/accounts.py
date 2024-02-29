from pydantic import BaseModel

class Account(BaseModel):
    email: str
    password: str
    id: str
