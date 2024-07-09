from uuid import UUID

from pydantic import BaseModel


class UserAuth(BaseModel):
    email: str
    password: str
    first_name: str
    last_name: str



class TokenSchema(BaseModel):
    access_token: str
    refresh_token: str


class TokenPayload(BaseModel):
    sub: str = None
    exp: int = None


class UserOut(BaseModel):
    id: str
    email: str


class SystemUser(UserOut):
    password: str

class ProductAuth(BaseModel):
    project_key: str