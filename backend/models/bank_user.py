from pydantic import BaseModel

class BankUser(BaseModel):
    employee_id: str
    name: str
    branch: str
    password: str