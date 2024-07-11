from fastapi import APIRouter, Depends

from controller.authenication import get_current_user
from database.engine import db
from pydantic_models.keystores_models import KeyStores
from pydantic_models.user_auth import SystemUser

app = APIRouter(prefix='/keystore', tags=['KeyStores'])

@app.post('/add-key')
async def add_key(data: KeyStores, user: SystemUser = Depends(get_current_user)):
    #  TODO Add the Encryption layer here like AES
    await db.keystores.create({
        'name': data.name,
        'description': data.description,
        'organisation': data.organisation,
        'key': data.key,
        'user_id': user.id
    })
    return {"message": "Key added successfully"}


@app.get('/get-keys')
async def get_keys(user: SystemUser = Depends(get_current_user)):
    return db.keystores.find({'user_id': user.id})
