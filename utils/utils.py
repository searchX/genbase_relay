from datetime import datetime, timedelta
from typing import Union, Any, Optional, Dict

import bcrypt
from fastapi import HTTPException
from jose import jwt

from utils.contants import ACCESS_TOKEN_EXPIRE_MINUTES, ALGORITHM, REFRESH_TOKEN_EXPIRE_MINUTES, JWT_REFRESH_SECRET_KEY, \
    JWT_SECRET_KEY

OPENAI_MODEL = 'openai'
GEMINI_MODEL = 'gemini'


def verify_model(platform: str, model: str) -> str:
    if platform == OPENAI_MODEL:
        if model not in ["gpt-3.5-turbo", "gpt-4.0-turbo"]:
            raise ValueError("Invalid model.")
        return model
    else:
        raise ValueError("Invalid model.")


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


if __name__ == "__main__":
    verify_model("openai", "gpt-3.5-turb")
