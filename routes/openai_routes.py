import requests
from fastapi import APIRouter, Depends

from controller.authenication import get_project_key

app = APIRouter(
    tags=['Open Ai']
)


@app.post("/proxy")
async def proxy(data: dict, project=Depends(get_project_key)):
    """
        Proxies requests to external AI APIs using the project-specific API key. Currently, this supports OpenAI,
        with plans to include Gemini in the future.

        This endpoint acts as a middleman, forwarding requests from the client to the specified AI API (OpenAI for now)
        and returning the response. It requires the client to specify the HTTP method, endpoint of the AI API,
        and any necessary request body. The project-specific API key is used for authorization with the AI API.

        Parameters:
        - data (dict): A dictionary containing the 'method' (HTTP method), 'endpoint' (AI API endpoint),
          and 'body' (request body for POST requests).
        - project (ProjectKey): The project key object obtained from dependency injection, used to authenticate
          the request with the AI API.

        Returns:
        - dict: The JSON response from the AI API. If the HTTP method is not supported, returns a message indicating
          that the method is not supported.
        """
    if data['method'] == 'POST':
        response = requests.post('https://api.openai.com/v1' + data['endpoint'], headers={
            "Content-Type": "application/json",
            "Authorization": f"Bearer {project.key}"
        }, json=data['body'])
        return response.json()
    elif data['method'] == 'GET':
        response = requests.get('https://api.openai.com/v1' + data['endpoint'], headers={
            "Content-Type": "application/json",
            "Authorization": f"Bearer {project.key}"
        })
        return response.json()
    return {
        "message": "Method not supported"
    }
