from fastapi import status, HTTPException, Depends, APIRouter
from fastapi.security import OAuth2PasswordRequestForm

from controller.authenication import create_user, get_current_user, get_user
from database.engine import db
from pydantic_models.user_auth import UserAuth, SystemUser, UserOut, ProjectAuth
from utils.utils import create_access_token, create_refresh_token, verify_password

app = APIRouter(tags=['Authentication'])


@app.get('/me', summary='Get details of currently logged in user', response_model=UserOut)
async def get_me(user: SystemUser = Depends(get_current_user)):
    """
      Retrieves the details of the currently logged-in user.

      This endpoint requires authentication and returns the details of the user who is currently authenticated. It is useful for fetching the profile information of the logged-in user to display or for other operations that require user-specific data.

      Parameters:
      - user (SystemUser): The currently authenticated user, automatically determined through dependency injection.

      Returns:
      - UserOut: A Pydantic model instance containing the user's details such as email, name, and roles.
      """
    return user


@app.post('/signup', summary="Create new user")
async def signup(data: UserAuth):
    """
       Creates a new user account with the provided user details.

       This endpoint is responsible for registering a new user in the system. It takes a UserAuth model containing the user's email, password, and any other required information. The password is hashed before storing it in the database for security reasons. If the user is successfully created, a success message is returned. In case of any error (e.g., email already exists), an appropriate error message is returned.

       Parameters:
       - data (UserAuth): A Pydantic model instance containing the user's authentication details such as email and password.

       Returns:
       - dict: A dictionary containing a message indicating the result of the operation. On success, it might return a message indicating successful account creation. On failure, it will return an error message detailing the reason for the failure.
       """
    try:
        return await create_user(data)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post('/login', summary="Create access and refresh tokens for user")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    """
      Authenticates a user and provides access and refresh tokens.

      This endpoint is responsible for authenticating users based on their email and password. Upon successful authentication, it generates and returns an access token and a refresh token. The access token is used for accessing protected routes, while the refresh token can be used to obtain a new access token when the current one expires.
      These endpoints deal with website for handling authentication.

      Parameters:
      - form_data (OAuth2PasswordRequestForm): A form containing the user's email and password.

      Returns:
      - dict: A dictionary containing the access token and refresh token.
    """

    user = await get_user(form_data.username)
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Incorrect email or password"
        )

    if not user.is_verified:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email not verified"
        )
    hashed_pass = user.password
    if not verify_password(form_data.password, hashed_pass):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Incorrect email or password"
        )
    return {
        "access_token": create_access_token(user.email),
        "refresh_token": create_refresh_token(user.email),
    }


@app.post('/project/auth/login')
async def project_login(data: ProjectAuth):
    """
       Authenticates a project using its unique project key and provides an access token.

       This endpoint is designed for project-specific authentication, allowing access to project-based operations and data. It requires a ProjectAuth model containing the project's unique key. Upon successful authentication, it generates and returns an access token.
       This endpoint is used by genbase client library for communication with the server.
       Parameters:
       - data (ProjectAuth): A Pydantic model instance containing the project's unique key.

       Returns:
       - dict: A dictionary containing the access token for the authenticated project.
       """
    data = await db.projects.find_unique(where={'project_key': data.project_key})
    if data is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Project Key does not exist"
        )

    return {
        "access_token": create_access_token(data.id),
    }
