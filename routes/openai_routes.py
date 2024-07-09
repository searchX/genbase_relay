from fastapi import APIRouter, Depends
from openai import OpenAI

from controller.authenication import get_current_user
from pydantic_models.openai_models import ChatCompletion
from pydantic_models.user_auth import SystemUser

app = APIRouter(
    tags=['Open Ai']
)
client = OpenAI()


@app.post("/chat/completion")
async def openai_chat_completion(data: ChatCompletion, user: SystemUser = Depends(get_current_user)):
    print(data)
    model = data.model
    messages = data.messages
    # response_format = {"type": "json_object"} if data.json_mode else None
    # if verify_model(OPENAI_MODEL, model) != model:
    #     raise HTTPException(status_code=400, detail="Model verification failed")

    response = client.chat.completions.create(
        model=model,
        messages=messages
    )
    return response


@app.post("/v1/chat/completions")
async def openai_chat_completion(data: dict):
    response = client.chat.completions.create(
        model=data['model'],
        messages=data['messages']
    )
    print(data)
    return response
