from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core import model_registry  # noqa: F401 — registers all models, import first
from app.api.router import api_router

app = FastAPI(title="AssetFlow API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix="/api")


@app.get("/")
def root():
    return {"status": "AssetFlow API running"}