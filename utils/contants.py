# Description: Constants for the project
import os

ACCESS_TOKEN_EXPIRE_MINUTES = 600
REFRESH_TOKEN_EXPIRE_MINUTES = 6000
ALGORITHM = os.getenv("ALGORITHM")
JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")  # should be kept secret
JWT_REFRESH_SECRET_KEY = os.getenv("JWT_REFRESH_SECRET_KEY")  # should be kept secret
