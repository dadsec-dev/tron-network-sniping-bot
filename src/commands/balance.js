const { tronWeb } = require('../utils/tron');
// const { getUserAddress } = require('../utils/database');
const { fetchWallet } = require('../service/user.service');
const axios = require('axios');


async function getTRC20Balance(address) {
  //@todo implement a function to get the balance of all trc20 tokens by an address
    try {
      const response = await axios.get('https://apilist.tronscanapi.com/api/account/tokens', {
        params: {
          address: address,
          start: 0,
          limit: 200, 
          hidden: 0,
          show: 0,
          sortBy: 2, 
          sortType: 0,
        }
      });

      const data = response.data;
      console.log(data);

      if (!data || !data.data || data.data.length === 0) {
        return `No tokens found for address: ${address}`;
      }

      let balanceReport = `Your token balances are: ${address}\n\n`;

      data.data.forEach(token => {
        balanceReport += `${token.tokenName} (${token.tokenAbbr}): ${token.balance / Math.pow(10, token.tokenDecimal)} usd current value is ${token.tokenPriceInUsd}\n`;
      });
  
      return balanceReport;
    } catch (error) {
      console.error("Error fetching balance:", error);
      return "Sorry, an error occurred while fetching your TRC20 balance.";
    }
}

module.exports = async function balanceCommand(ctx) {
  try {
    // const address = await getUserAddress(ctx.chat.id);
    const walletResult = await fetchWallet(ctx.chat.id);
   
    const address = walletResult.success ? walletResult.wallet_address : null;
    console.log(`user address to query is: ${address}`)
    // const address = 'TSTVYwFDp7SBfZk7Hrz3tucwQVASyJdwC7';
    if (!address) {
      return ctx.reply("You don't have a registered TRON address. Please start the bot first.");
    }

    const balance = await tronWeb.trx.getBalance(address);
    ctx.reply(`Your TRX balance is: ${tronWeb.fromSun(balance)} TRX`);

    const trc20Balance = await getTRC20Balance(address);
    ctx.reply(`${trc20Balance} `);
  } catch (error) {
    console.error("Error fetching balance:", error);
    ctx.reply("Sorry, an error occurred while fetching your TRX balance.");
  }

};
