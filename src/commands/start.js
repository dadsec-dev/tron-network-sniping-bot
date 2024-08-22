const { tronWeb, encrypt } = require('../utils/tron');
const { saveUserAddress } = require('../utils/database');
const userServices = require("../service/user.service")

const {
    saveUser,
    fetchWallet,
    fetch_Private_key,
    UpdateUser,
} = userServices()

module.exports = async function startCommand(ctx) {
  try {
    const account = await tronWeb.createAccount();
    const pkey = account.privateKey;
    const encryptedPrivateKey = encrypt(account.privateKey);


    // Save the address and encrypted private key to the database
    // await saveUserAddress(ctx.chat.id, account.address.base58, encryptedPrivateKey); .
    const data = {id:ctx.chat.id, wallet_address:account.address.base58, encryptedPrivateKey:encryptedPrivateKey}
    await saveUser(data); // saves the data to the database 
    const balance = await tronWeb.trx.getBalance(account.address.base58);

    ctx.reply(`
      Welcome to the TRON Swap Bot!
      Your new TRON address is: ${account.address.base58}
      Your TRX balance is: ${tronWeb.fromSun(balance)} TRX
      Your encrypted private key is: ${encryptedPrivateKey}

      Make sure to securely store your private key
      ---------------------------------------------------
      ===================================================
      Private Key: ${pkey}
    `);
  } catch (error) {
    console.error("Error creating account or fetching balance:", error);
    ctx.reply("Sorry, an error occurred while creating your TRON address.");
  }
};

