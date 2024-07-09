import asyncio
import os
from pathlib import Path
from datetime import datetime, timedelta
from typing import Union, Any, Optional, Dict

import bcrypt
from fastapi import HTTPException
from jose import jwt
import bcrypt
from dotenv import load_dotenv
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig
from fastapi_mail.errors import ConnectionErrors
from itsdangerous import URLSafeTimedSerializer, BadTimeSignature, SignatureExpired
from pydantic import EmailStr

from database.engine import db
from pydantic_models.user_auth import SystemUser, TokenPayload
from utils.contants import ACCESS_TOKEN_EXPIRE_MINUTES, ALGORITHM, JWT_SECRET_KEY, JWT_REFRESH_SECRET_KEY, \
    REFRESH_TOKEN_EXPIRE_MINUTES
from datetime import datetime
from typing import Union, Any

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import jwt
from pydantic import ValidationError

from utils.utils import get_hashed_password

token_algo = URLSafeTimedSerializer(os.getenv("JWT_SECRET_KEY"), salt='Email_Verification_&_Forgot_password')

reuseable_oauth = OAuth2PasswordBearer(
    tokenUrl="/login",
    scheme_name="JWT"
)


async def get_current_user(token: str = Depends(reuseable_oauth)) -> SystemUser:
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
    return await db.user.find_unique(where={
        'email': email})


def token(email: EmailStr):
    _token = token_algo.dumps(email)
    return _token


def verify_token(_token: str):
    try:
        email = token_algo.loads(_token, max_age=1800)
    except SignatureExpired:
        return None
    except BadTimeSignature:
        return None
    except Exception:
        return None
    return {'email': email, 'check': True}


async def create_user(user):
    _token = token(user.email)
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

# config = ConnectionConfig(
#     MAIL_USERNAME=os.getenv('MAIL_USER_NAME'),
#     MAIL_PASSWORD=os.getenv('MAIL_PASSWORD'),
#     MAIL_FROM=os.getenv('MAIL_FROM'),
#     MAIL_PORT=os.getenv('MAIL_PORT'),
#     MAIL_SERVER=os.getenv('MAIL_SERVER'),
#     MAIL_STARTTLS=True,  # Changed from MAIL_TLS
#     MAIL_SSL_TLS=False,  # Changed from MAIL_SSL
#     TEMPLATE_FOLDER=Path(__file__).parent.parent / 'templates/'
# )
#
#
# async def send_email_async(subject: str, email_to: EmailStr, body: dict, template: str, subtype: str = "plain"):
#     message = MessageSchema(
#         subject=subject,
#         recipients=[email_to, ],
#         template_body=body,
#         subtype=subtype  # Add this line
#     )
#     fm = FastMail(config)
#     print("Email is being sent to " + email_to)
#     try:
#         await fm.send_message(message, template_name=template)
#         return True
#     except ConnectionErrors as e:
#         print(e)
#         return False
#
#
#
# email_verification_endpoint = f'{os.getenv("FRONTEND_URL")}confirm_email?token={123}'
# if __name__ == "__main__":
#     email = "abhinandansingla48@gmail.com"
#     asyncio.run(send_email_async(
#         subject="Email Verification: Registration Confirmation", subtype="html",
#         email_to=email, body={
#             'email': email,
#             'project_name': os.getenv('PROJECT_NAME'),
#             'url': email_verification_endpoint
#         }, template='email/email_verification.html'))
