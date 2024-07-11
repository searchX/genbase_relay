import uuid

from fastapi import APIRouter, Depends

from controller.authenication import get_current_user
from database.engine import db
from pydantic_models.projects_models import ProjectSetup
from pydantic_models.user_auth import SystemUser

app = APIRouter(
    prefix='/projects',
    tags=['Projects']
)


@app.post('/add-project')
async def add_project(data: ProjectSetup, user: SystemUser = Depends(get_current_user)):
    """
        Adds a new project to the database with a unique project key.

        This endpoint requires authentication and uses the current authenticated user's ID to associate the new project with the user. A unique project key is generated for each new project, which is essential for future operations on the project. This key is returned in the response but cannot be retrieved again if lost, so it must be stored securely by the client.

        Parameters:
        - data (ProjectSetup): A Pydantic model instance containing the project's name, description, organisation, and key.
        - user (SystemUser): The currently authenticated user, automatically determined through dependency injection.

        TODO: Add a layer of encryption like AES to the key before storing.

        Returns:
        - dict: A dictionary containing a message indicating successful project addition and the unique project key.
    """
    unique_key = str(uuid.uuid4())
    await db.projects.create({
        'name': data.name,
        'description': data.description,
        'user_id': user.id,
        'project_key': unique_key,
        'organisation': data.organisation,
        'key': data.key
    })
    return {
        "message": "Project added successfully. Rememeber to Store this in safe place as it can't be retrieve again if lost",
        'project_key': unique_key
    }


@app.get('/get-projects')
async def get_projects(user: SystemUser = Depends(get_current_user)):
    """
      Retrieves a list of projects associated with the current authenticated user.

      This endpoint requires authentication and returns all projects that are associated with the user's ID. It is useful for fetching a user's projects to display them or perform further operations.

      Parameters:
      - user (SystemUser): The currently authenticated user, automatically determined through dependency injection.

      Returns:
      - List[dict]: A list of dictionaries, each representing a project with its details such as name, description, organisation, project key, and user ID.
      """
    data = await db.projects.find_many(where={"user_id": user.id})
    return data
