from fastapi import FastAPI
from core.config import settings
from routers.v1.notes.notes import router as NotesRouter
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title=settings.PROJECT_NAME, version=settings.PROJECT_VERSION)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"], 
)

app.include_router(NotesRouter, tags=["Notes"], prefix="/v1/notes")

@app.get("/")
async def root():
    return {"message": "This will be the main window of the Notes APP!!"}
