from pydantic import BaseModel

class LoanEnquiry(BaseModel):

    full_name: str
    age: int

    pan_number: str
    phone_number: str
    email: str

    annual_income: float
    existing_loans: int

    owns_house: bool
    owns_car: bool

    loan_type: str
    requested_amount: float