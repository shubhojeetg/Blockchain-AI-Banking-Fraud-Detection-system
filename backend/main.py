from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.analytics_routes import router as analytics_router
from routes.auth_routes import router as auth_router
from routes.enquiry_routes import router as enquiry_router
from routes.blockchain_routes import router as blockchain_router

app = FastAPI()

# CORS CONFIGURATION
app.add_middleware(
    CORSMiddleware,

    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)

# ROUTES
app.include_router(auth_router)
app.include_router(enquiry_router)
app.include_router(analytics_router)
app.include_router(blockchain_router)

@app.get("/")
def home():
    return {
        "message": "Loan Fraud Detection API Running"
    }