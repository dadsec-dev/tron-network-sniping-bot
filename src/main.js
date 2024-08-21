const { Telegraf } = require('telegraf');
const { getUserAddress } = require('./utils/database');
const { startCommand, balanceCommand, swapTokens } = require('./commands');

const botToken = process.env.BOT_TOKEN;
const bot = new Telegraf(botToken);

bot.start(startCommand);

bot.command('balance', balanceCommand);

// bot.command('swap', swapTokens);
bot.command('swap', async (ctx) => {
    console.log('swap command called');
    const address = await getUserAddress(ctx.chat.id);
    const fromToken = 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t'; // USDT
    const toToken = 'TEkxiTehnzSmSe2XqrBj4w32RUN966rdz8';   // USDC
    const amount = '10000000';
    const recipient = address; 
    
    swapTokens(ctx, fromToken, toToken, amount, recipient);
  });

bot.launch();


console.log('Bot is running...');

// bot.launch(startCommand);

// bot.launch(startCommand);