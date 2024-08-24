const { Telegraf } = require('telegraf');
const { getUserAddress } = require('./utils/database');
const { startCommand, balanceCommand, swapTokens } = require('./commands');
const {fetchWallet} = require('../src/service/user.service');
const  databaseConnect  = require('./utils/database');
// const { connect } = require('mongoose');

const botToken = process.env.BOT_TOKEN;
// const bot = new Telegraf(botToken);



(async () => {
  try {
    await databaseConnect();  
    console.log('Database connected successfully');

    const bot = new Telegraf(botToken);

    bot.start(startCommand);

    bot.command('balance', balanceCommand);

    bot.command('swap', async (ctx) => {
      console.log('swap command called');
      console.log('Connecting to the db and getting the user wallet');

      const walletResult = await fetchWallet(ctx.chat.id);
      const address = walletResult.success ? walletResult.wallet_address : null;

      console.log(`Recipient address is ${address}`);

      const fromToken = 'TNUC9Qb1rRpS5CbWLmNMxXBjyFoydXjWFR'; // WTRX
      const toToken = 'TXL6rJbvmjD46zeN1JssfgxvSo99qC8MRT';   // SUN
      const amount = '10';

      swapTokens(ctx, fromToken, toToken, amount, address);
    });

    bot.launch();
    console.log('Bot is running...');

  } catch (error) {
    console.error('Failed to connect to the database:', error);
    process.exit(1);  
  }
})();
