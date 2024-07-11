# GenBase Relay

GenBase Relay is dedicated backend which powers GenBase library, It acts as intermediary between GenBase library and
OpenAI/Gemini servers!

If you prefer not to host your own GenBase Relay, you can use the hosted GenBase service for free. Simply sign up at [https://genbase.neurotaskai.com/](https://genbase.neurotaskai.com/) to get started.

# How to use GenBase Relay?

Go to your [GenBase library](https://pub.dev/packages/genbase) and set the `base_url` parameter to `http://<relay url>:<relay port>` and you are good to go!
## Features

- **Secure API Key Storage**: Keep your API keys hidden and secure from public exposure.
- **Easy Endpoint Access**: Utilize straightforward endpoints for prompt interactions, simplifying the process of sending and receiving data.
- **No Dedicated Backend Required**: Eliminate the need for managing a separate backend infrastructure, reducing complexity and maintenance efforts.
- **Enhanced Development Experience**: Leverage an array of features designed to elevate your development process and enable rapid application development with LLMs.

## Getting Started

To start using GenBase Relay in your project, follow these simple steps:

1. **Set Up GenBase Relay**: Configure the `base` parameter in your GenBase library to point to your GenBase Relay URL. Format: `http://<relay url>:<relay port>`.

2. **Clone the Repository**:
    ```bash
    git clone https://github.com/searchX/genbase_relay
    ```

3. **Install Dependencies**:
    ```bash
    pip install -r requirements.txt
    ```

4. **Initialize Database**:
    ```bash
    prisma db push
    ```

5. **Configure Environment Variables**:
    ```bash
    cp .env.template .env
    # Edit the .env file with your specific configurations
    ```

6. **Run the Server**:
    ```bash
    python main.py
    ```

## Contributing

We welcome contributions from the community! If you're interested in improving GenBase Relay, please feel free to fork the repository, make your changes, and submit a pull request.

## License

GenBase Relay is open-sourced under the MIT license. See the LICENSE file for more details.

