from fastapi import APIRouter, HTTPException
from models.enquiry import LoanEnquiry
from database.mongodb import enquiries_collection
from blockchain.blockchain import blockchain
import re

router = APIRouter()


# PAN VALIDATION FUNCTION
def validate_pan(pan: str):

    pattern = r"^[A-Z]{5}[0-9]{4}[A-Z]{1}$"

    return re.match(pattern, pan)


# FRAUD DETECTION FUNCTION
def calculate_risk(enquiry: LoanEnquiry):

    risk_score = 0
    reasons = []

    # RULE 1
    if enquiry.requested_amount > (enquiry.annual_income * 5):
        risk_score += 30
        reasons.append("Requested loan amount too high")

    # RULE 2
    if enquiry.owns_car and enquiry.loan_type.lower() == "car loan":
        risk_score += 20
        reasons.append("Customer already owns a car")

    # RULE 3
    if enquiry.existing_loans >= 3:
        risk_score += 25
        reasons.append("Too many existing loans")

    # RULE 4
    if enquiry.age < 21:
        risk_score += 15
        reasons.append("Very young applicant")

    # -----------------------------
    # ENQUIRY LINKING LOGIC
    # -----------------------------

    # SAME PAN CHECK
    same_pan_count = enquiries_collection.count_documents(
        {"pan_number": enquiry.pan_number}
    )

    if same_pan_count >= 2:
        risk_score += 20
        reasons.append("Multiple enquiries found using same PAN")

    # SAME PHONE DIFFERENT PAN CHECK
    phone_records = enquiries_collection.find(
        {"phone_number": enquiry.phone_number}
    )

    different_pan_found = False

    for record in phone_records:

        if record["pan_number"] != enquiry.pan_number:
            different_pan_found = True
            break

    if different_pan_found:
        risk_score += 30
        reasons.append("Phone number linked with multiple PANs")

    # FINAL STATUS
    if risk_score >= 60:
        status = "Fraud"
    elif risk_score >= 30:
        status = "Suspicious"
    else:
        status = "Genuine"

    return {
        "risk_score": risk_score,
        "status": status,
        "reasons": reasons
    }


# CREATE ENQUIRY API
@router.post("/loan-enquiry")
def create_enquiry(enquiry: LoanEnquiry):

    # PAN VALIDATION
    if not validate_pan(enquiry.pan_number):
        raise HTTPException(
            status_code=400,
            detail="Invalid PAN Number"
        )

    # FRAUD ANALYSIS
    fraud_result = calculate_risk(enquiry)

    enquiry_data = enquiry.dict()

    enquiry_data["risk_score"] = fraud_result["risk_score"]
    enquiry_data["status"] = fraud_result["status"]
    enquiry_data["reasons"] = fraud_result["reasons"]

        # CREATE SEPARATE COPY FOR DATABASE
    db_data = enquiry_data.copy()

    # SAVE TO DATABASE
    enquiries_collection.insert_one(db_data)

    # CREATE CLEAN COPY FOR BLOCKCHAIN
    blockchain_data = enquiry_data.copy()

    # SAVE TO BLOCKCHAIN
    new_block = blockchain.add_block(blockchain_data)
    return {
    "message": "Loan enquiry processed successfully",
    "fraud_analysis": fraud_result,
    "blockchain_record": {
        "block_index": new_block["index"],
        "hash": new_block["hash"],
        "previous_hash": new_block["previous_hash"]
    }
}