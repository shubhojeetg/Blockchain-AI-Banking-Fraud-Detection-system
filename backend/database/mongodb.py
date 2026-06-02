from pymongo import MongoClient

MONGO_URL = "mongodb://localhost:27017"

client = MongoClient(MONGO_URL)

db = client["loan_fraud_system"]

bank_users_collection = db["bank_users"]
enquiries_collection = db["enquiries"]
blockchain_collection = db["blockchain"]