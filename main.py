import asyncio
from typing import List

from dotenv import load_dotenv
from fastapi import FastAPI, Request
from fastapi.concurrency import asynccontextmanager
from openai import OpenAI
from fastapi import HTTPException
from starlette.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

from database.engine import db
from pydantic_models.openai_models import ChatCompletion
from routes import auth_routes, openai_routes, keystores_routes, projects_routes
from utils.utils import verify_model, OPENAI_MODEL

load_dotenv()


@asynccontextmanager
async def lifespan(app: FastAPI):
    await db.connect()
    yield
    await db.disconnect()


app = FastAPI(lifespan=lifespan)

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_routes.app)
app.include_router(openai_routes.app)
app.include_router(keystores_routes.app)
app.include_router(projects_routes.app)

templates = Jinja2Templates(directory="templates")

# ----- Mount paths for dashboard only ----- #
app.mount("/dashboard/assets", StaticFiles(directory="templates/console/assets"), name="assets")

@app.get("/dashboard")
async def serve_spa(request: Request):
    return templates.TemplateResponse("console/index.html", {"request": request})

@app.get("/manifest.json")
async def serve_spa(request: Request):
    return templates.TemplateResponse("console/manifest.json", {"request": request})

# ----- Mount paths for landing page only ----- #
app.mount("/assets", StaticFiles(directory="templates/landing/assets"), name="assets")

@app.get("/landing")
async def serve_spa(request: Request):
    return templates.TemplateResponse("landing/index.html", {"request": request})

@app.get("/script.js")
async def serve_spa(request: Request):
    return templates.TemplateResponse("landing/script.js", {"request": request})

@app.get("/style.css")
async def serve_spa(request: Request):
    return templates.TemplateResponse("landing/style.css", {"request": request})

if __name__ == "__main__":
    import uvicorn

    uvicorn.run('main:app', host="0.0.0.0", port=8000, log_level="debug", reload=True, )
