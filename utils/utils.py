from datetime import datetime, timedelta
from typing import Union, Any

import bcrypt
from jose import jwt

from utils.contants import ACCESS_TOKEN_EXPIRE_MINUTES, ALGORITHM, REFRESH_TOKEN_EXPIRE_MINUTES, JWT_REFRESH_SECRET_KEY, \
    JWT_SECRET_KEY

def get_hashed_password(password: str) -> str:
    salt = bcrypt.gensalt()
    hash_password = bcrypt.hashpw(
        password=str.encode(password),
        salt=salt
    )
    return hash_password.decode()


def verify_password(password: str, hashed_pass: str) -> bool:
    return bcrypt.checkpw(
        password=str.encode(password),
        hashed_password=str.encode(hashed_pass)
    )


def create_access_token(subject: Union[str, Any]) -> str:
    expires_delta = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode = {"exp": expires_delta, "sub": str(subject)}
    encoded_jwt = jwt.encode(to_encode, JWT_SECRET_KEY, ALGORITHM)
    return encoded_jwt


def create_refresh_token(subject: Union[str, Any]) -> str:
    expires_delta = datetime.utcnow() + timedelta(minutes=REFRESH_TOKEN_EXPIRE_MINUTES)
    to_encode = {"exp": expires_delta, "sub": str(subject)}
    encoded_jwt = jwt.encode(to_encode, JWT_REFRESH_SECRET_KEY, ALGORITHM)
    return encoded_jwt
