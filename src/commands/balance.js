const { tronWeb } = require('../utils/tron');
const { getUserAddress } = require('../utils/database');

module.exports = async function balanceCommand(ctx) {
  try {
    const address = await getUserAddress(ctx.chat.id);
    if (!address) {
      return ctx.reply("You don't have a registered TRON address. Please start the bot first.");
    }

    const balance = await tronWeb.trx.getBalance(address);
    ctx.reply(`Your TRX balance is: ${tronWeb.fromSun(balance)} TRX`);
  } catch (error) {
    console.error("Error fetching balance:", error);
    ctx.reply("Sorry, an error occurred while fetching your TRX balance.");
  }
};
