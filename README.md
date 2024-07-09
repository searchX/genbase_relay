# GenBase Relay
GenBase Relay is dedicated backend which powers GenBase library, It acts as intermediary between GenBase library and OpenAI/Gemini servers!

# How to use GenBase Relay?
Go to your GenBase library and set the `base` parameter to `http://<relay url>:<relay port>` and you are good to go!

# Installation
Clone the repository
```
git clone https://github.com/searchX/genbase_relay
```
Install the dependencies
```
pip install -r requirements.txt
```
Push prisma schema
```
prisma db push
```
Change environment variables in `.env` file
```
cp .env.template .env
> Change the values in .env file
```
Run the server
```
python main.py
```
