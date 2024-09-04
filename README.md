# Tron Blockchain Sniping Bot

## Overview
This project is a Sniping Bot for the Tron blockchain, designed to allow users to quickly buy and sell tokens on the Tron network. It utilizes SunSwap's Smart Router for executing trades at the best prices with faster dynamic routing for trading pairs.

## Key Features
- Fast Token Trades: Execute buy and sell orders quickly on the Tron blockchain.
- AI-Enhanced Advisory: Analyze tokens before purchase and provide insights on potential risks.
- Optimized Routing: Uses SunSwap's Smart Router for best price execution and efficient trading routes.
- Telegram Bot Interface: Interact with the bot through Telegram commands.

## Prerequisites
- Node.js
- MongoDB
- Tron API Key
- Telegram Bot Token

## Installation
1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Set up environment variables in a `.env` file:
   ```
   BOT_TOKEN=your_telegram_bot_token
   TRON_FULL_HOST=https://api.trongrid.io
   API_KEY=your_tron_api_key
   PRIVATE_KEY=your_private_key
   ENCRYPTION_KEY=your_encryption_key
   DATABASE_URI=your_mongodb_connection_string
   ```

## Usage
1. Start the bot:
   ```
   node src/main.js
   ```
2. Interact with the bot on Telegram using the following commands:
   - `/start`: Create a new TRON address and wallet
   - `/balance`: Check your TRX and TRC20 token balances
   - `/swap`: Swap tokens using SunSwap's Smart Router

## Project Structure
- `src/main.js`: Entry point of the application
- `src/commands/`: Contains command handlers for Telegram bot
- `src/utils/`: Utility functions including Tron Web setup and database operations
- `src/service/`: Service layer for user-related operations
- `src/model/`: MongoDB schema definitions
- `src/config/`: Configuration constants and settings

## Key Components
1. Tron Web Integration:
   ```javascript:src/utils/tron.js
   startLine: 7
   endLine: 11
   ```

2. Telegram Bot Commands:
   ```javascript:src/main.js
   startLine: 20
   endLine: 38
   ```

3. Token Swapping:
   ```javascript:src/commands/swap.js
   startLine: 26
   endLine: 77
   ```

4. Database Operations:
   ```javascript:src/service/user.service.js
   startLine: 5
   endLine: 107
   ```

## Contributing
We welcome contributions! If you're interested in improving this project, feel free to fork the repository and submit a pull request.

## Contact Information
For any queries or collaborations, please reach out to:
- Email: 
  - geecypher41@gmail.com
  - secdad1@gmail.com
  - chideraonwuatu433@gmail.com

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
