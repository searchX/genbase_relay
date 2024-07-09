import uuid

import bcrypt
from fastapi import APIRouter, Depends

from controller.authenication import get_current_user
from database.engine import db
from pydantic_models.projects_models import ProjectSetup
from pydantic_models.user_auth import SystemUser
from utils.utils import get_hashed_password

app = APIRouter(
    prefix='/projects',
    tags=['Projects']
)


#
@app.post('/add-project')
async def add_project(data: ProjectSetup, user: SystemUser = Depends(get_current_user)):
    unique_key = str(uuid.uuid4())
    await db.projects.create({
        'name': data.name,
        'description': data.description,
        'user_id': user.id,
        'project_key': unique_key
    })
    return {
        "message": "Project added successfully. Rememeber to Store this in safe place as it can't be retrieve again if lost",
        'project_key': unique_key
    }


@app.get('/get-projects')
async def get_projects(user: SystemUser = Depends(get_current_user)):
    data = await db.projects.find_many(where={"user_id": user.id})
    return data
