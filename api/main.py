from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware
import os
from authenticator import authenticator
from routers import accounts, budgets, itinerary, packing_list, accommodations



app = FastAPI()
app.include_router(authenticator.router)
app.include_router(accounts.router)
app.include_router(budgets.router)
app.include_router(itinerary.router)
app.include_router(packing_list.router)
app.include_router(accommodations.router)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        os.environ.get("CORS_HOST")
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# app.include_router(authenticator.router, tags=['Auth'])

@app.get("/api/launch-details")
def launch_details():
    return {
        "launch_details": {
            "module": 3,
            "week": 17,
            "day": 5,
            "hour": 19,
            "min": "00"
        }
    }
