from fastapi import APIRouter, HTTPException
from models.bank_user import BankUser
from database.mongodb import bank_users_collection
from auth.jwt_handler import hash_password, verify_password

router = APIRouter()

@router.post("/register")
def register(user: BankUser):

    existing_user = bank_users_collection.find_one(
        {"employee_id": user.employee_id}
    )

    if existing_user:
        raise HTTPException(status_code=400, detail="Employee already exists")

    user_dict = user.dict()

    user_dict["password"] = hash_password(user.password)

    bank_users_collection.insert_one(user_dict)

    return {"message": "Bank employee registered successfully"}


@router.post("/login")
def login(data: dict):

    employee = bank_users_collection.find_one(
        {"employee_id": data["employee_id"]}
    )

    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")

    if not verify_password(data["password"], employee["password"]):
        raise HTTPException(status_code=401, detail="Invalid password")

    return {
        "message": "Login successful",
        "employee_name": employee["name"]
    }