from fastapi import APIRouter

from database.mongodb import (
    enquiries_collection,
    blockchain_collection
)

router = APIRouter()

@router.get("/recent-enquiries")
def recent_enquiries():

    enquiries = list(

        enquiries_collection.find(
            {},
            {"_id": 0}
        ).sort("_id", -1).limit(5)
    )

    return enquiries

@router.get("/dashboard-stats")
def dashboard_stats():

    total_enquiries = enquiries_collection.count_documents({})

    fraud_cases = enquiries_collection.count_documents(
        {"status": "Fraud"}
    )

    genuine_cases = enquiries_collection.count_documents(
        {"status": "Genuine"}
    )

    suspicious_cases = enquiries_collection.count_documents(
        {"status": "Suspicious"}
    )

    total_blocks = blockchain_collection.count_documents({})

    return {

        "total_enquiries": total_enquiries,

        "fraud_cases": fraud_cases,

        "genuine_cases": genuine_cases,

        "suspicious_cases": suspicious_cases,

        "total_blocks": total_blocks
    }