# Description: Constants for the project
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7
REFRESH_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7  # 7 days
ALGORITHM = "HS256"
JWT_SECRET_KEY = "secret"  # should be kept secret
JWT_REFRESH_SECRET_KEY = "secret but secure"  # should be kept secret
