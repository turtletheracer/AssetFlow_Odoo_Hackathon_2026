from fastapi import FastAPI

app = FastAPI(
    title="AssetFlow API",
    version="1.0.0"
)

@app.get("/")
async def root():
    return {
        "message": "AssetFlow Backend Running 🚀"
    }