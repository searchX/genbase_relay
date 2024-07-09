from pydantic import BaseModel


class KeyStores(BaseModel):
    name: str
    description: str
    organisation: str
    key: str
