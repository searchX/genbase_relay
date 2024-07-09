from fastapi import status, HTTPException, Depends, APIRouter, BackgroundTasks
from fastapi.security import OAuth2PasswordRequestForm
from controller.authenication import create_user, get_current_user, get_user
from database.engine import db
from pydantic_models.user_auth import UserAuth, SystemUser, UserOut, ProductAuth
from utils.utils import create_access_token, create_refresh_token, verify_password, get_hashed_password

app = APIRouter(tags=['Authentication'])


#
# @app.get('/me', summary='Get details of currently logged in user', response_model=UserOut)
# async def get_me(user: SystemUser = Depends(get_current_user)):
#     return user
#
@app.get('/me', summary='Get details of currently logged in user', response_model=UserOut)
async def get_me(user: SystemUser = Depends(get_current_user)):
    return user


@app.post('/signup', summary="Create new user")
async def signup(data: UserAuth):
    try:
        return await create_user(data)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post('/login', summary="Create access and refresh tokens for user")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = await get_user(form_data.username)
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Incorrect email or password"
        )

    if not user.is_verified:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email not verified"
        )
    print(user)
    hashed_pass = user.password
    if not verify_password(form_data.password, hashed_pass):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Incorrect email or password"
        )
    return {
        "access_token": create_access_token(user.email),
        "refresh_token": create_refresh_token(user.email),
    }


@app.post('/project/auth/login')
async def project_login(data: ProductAuth):
    data = await db.projects.find_unique(where={'project_key': data.project_key})
    if data is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Project Key does not exist"
        )

    return {
        "access_token": create_access_token(data.id),
    }
# @app.post('/confirm-email', status_code=status.HTTP_202_ACCEPTED)
# async def confirm_email(_token: str):
#     email = verify_token(_token)
#     if email is None:
#         raise HTTPException(
#             status_code=status.HTTP_400_BAD_REQUEST,
#             detail="Invalid Token"
#         )
#     cursor = connection.get_cursor()
#     try:
#         cursor.execute(
#             "UPDATE company SET is_verified = TRUE WHERE email = %s",
#             (email['email'],)
#         )
#         connection.commit()
#     except Exception as e:
#         connection.rollback()
#         raise HTTPException(status_code=501, detail=str(e))
#     finally:
#         cursor.close()
#     return "Email Verified Successfully"
#
#
# @app.post('/resend-verification', status_code=status.HTTP_201_CREATED)
# async def resend_verification(email: str):
#     user = get_user_by_email(email)
#     if user is None:
#         raise HTTPException(
#             status_code=status.HTTP_400_BAD_REQUEST,
#             detail="User with this email does not exist"
#         )
#     if user['is_verified']:
#         raise HTTPException(
#             status_code=status.HTTP_400_BAD_REQUEST,
#             detail="User is already verified"
#         )
#     _token = token(email)
#     email_verification_endpoint = f'{os.getenv("FRONTEND_URL")}confirm_email?token={_token}'
#     mail_body = {
#         'email': email,
#         'project_name': os.getenv('PROJECT_NAME'),
#         'url': email_verification_endpoint
#     }
#     mail_status = await send_email_async(
#         subject="Email Verification: Registration Confirmation",
#         email_to=email, body=mail_body, template='email/email_verification.html', subtype='html')
#     if mail_status:
#         return {
#             "message": "Email Verification has been sent, kindly check your inbox. If you don't see it, check your spam folder. If you still don't see it, kindly reach out to the server guy. or use the TOKEN=" + _token,
#             "status": status.HTTP_201_CREATED
#         }
#     else:
#         return {
#             "message": "Email Verification failed to send, kindly reach out to the server guy.",
#             "status": status.HTTP_503_SERVICE_UNAVAILABLE
#         }
#
#
# class ResetPasswordRequest(BaseModel):
#     email: str
#
# @app.post('/forgot-password')
# async def forgot_password(request: ResetPasswordRequest, background_tasks: BackgroundTasks):
#     user = get_user_by_email(request.email)
#     if user is None:
#         raise HTTPException(
#             status_code=400,
#             detail="User with this email does not exist"
#         )
#
#     reset_token = token(request.email)
#     print(reset_token)
#     reset_password_endpoint = f'{os.getenv("FRONTEND_URL")}reset_password?token={reset_token}'
#     mail_body = {
#         'email': request.email,
#         'project_name': os.getenv('PROJECT_NAME'),
#         'url': reset_password_endpoint
#     }
#
#     background_tasks.add_task(
#         send_email_async,
#         subject="Password Reset Request",
#         email_to=request.email,
#         body=mail_body,
#         template='email/password_reset.html',
#         subtype='html'
#     )
#
#     return {
#         "message": "Password reset link has been sent to your email.",
#         "status": 200
#     }
#
#
# class ResetPassword(BaseModel):
#     token: str
#     new_password: str
#
# @app.post('/reset_password')
# async def reset_password(data: ResetPassword):
#     email = verify_token(data.token)
#     print(email)
#     if email is None:
#         raise HTTPException(
#             status_code=status.HTTP_400_BAD_REQUEST,
#             detail="Invalid Token"
#         )
#     cursor = connection.get_cursor()
#     try:
#         hashed_password = get_hashed_password(data.new_password)
#         cursor.execute(
#             "UPDATE company SET password = %s WHERE email = %s",
#             (hashed_password, email['email'],)
#         )
#         connection.commit()
#     except Exception as e:
#         connection.rollback()
#         raise HTTPException(status_code=501, detail=str(e))
#     finally:
#         cursor.close()
#     return "Password Reset Successfully"
