from typing import List, Optional
from pydantic import BaseModel


class FunctionParameters(BaseModel):
    name: str
    type: str


class Function(BaseModel):
    name: str
    description: str
    parameters: FunctionParameters


class Tool(BaseModel):
    type: str
    function: Function


class MessageType(BaseModel):
    type: str
    text: str


class Message(BaseModel):
    role: str
    content: List[MessageType]


class ChatCompletion(BaseModel):
    model: str
    messages: List[Message]
    # json_mode: bool = False
    # tools = List[Tool]
    # tool_choice = Tool
