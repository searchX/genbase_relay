from datetime import datetime
from typing import Union, Any

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, HTTPAuthorizationCredentials, HTTPBearer
from jose import jwt
from pydantic import ValidationError

from database.engine import db
from pydantic_models.user_auth import SystemUser, TokenPayload, ReturnProjectKey
from utils.contants import ALGORITHM, JWT_SECRET_KEY
from utils.utils import get_hashed_password

reuseable_oauth = OAuth2PasswordBearer(
    tokenUrl="/login",
    scheme_name="JWT"
)


async def get_current_user(token: str = Depends(reuseable_oauth)) -> SystemUser:
    """
       Retrieves the currently authenticated user based on the provided JWT token.

       This function decodes the JWT token to extract the user's identity (email) and queries the database to retrieve the user's details. If the token is expired or invalid, it raises an HTTPException with the appropriate status code and detail message. It ensures that only valid and authenticated requests can fetch user data.

       Parameters:
       - token (str): The JWT token obtained during user authentication.

       Returns:
       - SystemUser: A Pydantic model instance containing the authenticated user's details.

       Raises:
       - HTTPException: With status code 401 (Unauthorized) if the token is expired.
       - HTTPException: With status code 403 (Forbidden) if the token is invalid.
       - HTTPException: With status code 404 (Not Found) if the user does not exist in the database.
       """
    try:
        payload = jwt.decode(
            token, JWT_SECRET_KEY, algorithms=[ALGORITHM]
        )
        token_data = TokenPayload(**payload)

        if datetime.fromtimestamp(token_data.exp) < datetime.now():
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Token expired",
                headers={"WWW-Authenticate": "Bearer"},
            )

    except(jwt.JWTError, ValidationError):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

    user: Union[dict[str, Any], None] = await get_user(token_data.sub)
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Could not find user",
        )

    return SystemUser(**dict(user))


async def get_user(email):
    """
     Retrieves a user from the database based on their email address.

     This function queries the database for a user with the specified email. If a user with the given email exists, it returns the user's details; otherwise, it returns None. This function is primarily used for authentication purposes, to verify if a user exists before proceeding with login or signup operations.

     Parameters:
     - email (str): The email address of the user to retrieve.

     Returns:
     - dict[str, Any] | None: A dictionary containing the user's details if found, otherwise None.
     """
    return await db.user.find_unique(where={
        'email': email})


async def get_project(id):
    """
    Retrieves a project from the database based on its unique identifier.

    This function queries the database for a project with the specified ID. If a project with the given ID exists, it returns the project's details; otherwise, it returns None. This function is used to fetch project information for various operations within the system.

    Parameters:
    - id (str): The unique identifier of the project to retrieve.

    Returns:
    - dict[str, Any] | None: A dictionary containing the project's details if found, otherwise None.
    """
    return await db.projects.find_unique(where={
        "id": id
    })


async def create_user(user):
    """
      Creates a new user in the database.

      This function attempts to create a new user with the provided details. Before creating the user, it checks if a user with the same email already exists in the database to avoid duplicates. If the user already exists, it raises an HTTPException. Otherwise, it creates the user with hashed password and returns a success message.

      Parameters:
      - user (UserCreate): A Pydantic model instance containing the user's details such as email, password, first name, and last name.

      Returns:
      - dict[str, str]: A dictionary containing the email of the newly created user and a status message indicating successful creation.

      Raises:
      - HTTPException: With status code 400 (Bad Request) if the user already exists.
      """
    if await db.user.find_unique(where={'email': user.email}):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User already exists"
        )

    await db.user.create({
        'email': user.email,
        'password': get_hashed_password(user.password),
        'first_name': user.first_name,
        'last_name': user.last_name,
    })
    return {
        'email': user.email,
        'status': 'User Created',
    }


security = HTTPBearer()


async def get_project_key(token: HTTPAuthorizationCredentials = Depends(security)) -> ReturnProjectKey:
    """
       Retrieves the project key based on the provided JWT token.

       This function decodes the JWT token to extract the project's unique identifier and queries the database to retrieve the project's key. If the token is expired or invalid, it raises an HTTPException with the appropriate status code and detail message. It ensures that only valid and authenticated requests can fetch the project key.

       Parameters:
       - token (HTTPAuthorizationCredentials): The JWT token obtained during project authentication.

       Returns:
       - ReturnProjectKey: A Pydantic model instance containing the project's key.

       Raises:
       - HTTPException: With status code 401 (Unauthorized) if the token is expired.
       - HTTPException: With status code 403 (Forbidden) if the token is invalid.
       - HTTPException: With status code 404 (Not Found) if the project does not exist in the database.
       """

    token_str = token.credentials  # Get the actual token string
    print(token_str)
    try:
        payload = jwt.decode(
            token_str, JWT_SECRET_KEY, algorithms=[ALGORITHM]
        )
        token_data = TokenPayload(**payload)

        if datetime.fromtimestamp(token_data.exp) < datetime.now():
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Token expired",
                headers={"WWW-Authenticate": "Bearer"},
            )

    except (jwt.JWTError, ValidationError):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    print(token_data)
    project: Union[dict[str, Any], None] = await get_project(token_data.sub)
    if project is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Could not find project",
        )

    return ReturnProjectKey(**dict(project))
