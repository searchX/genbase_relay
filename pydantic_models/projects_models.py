from pydantic import BaseModel


class ProjectSetup(BaseModel):
    name: str
    description: str
