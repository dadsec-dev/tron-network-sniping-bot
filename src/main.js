const { Telegraf } = require('telegraf');
const { startCommand, balanceCommand, swapTokens } = require('./commands');

const botToken = process.env.BOT_TOKEN;
const bot = new Telegraf(botToken);

bot.start(startCommand);

bot.command('balance', balanceCommand);

bot.command('swap', swapTokens);

bot.launch();


console.log('Bot is running...');

// bot.launch(startCommand);

// bot.launch(startCommand);