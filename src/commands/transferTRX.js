const { tronWeb, decrypt } = require('../utils/tron');
const { fetchWallet, fetch_Private_key } = require('../service/user.service');

async function transferTRX(ctx, toAddress, amount) {
  try {
    // Fetch the user's wallet
    const walletResult = await fetchWallet(ctx.chat.id);
    if (!walletResult.success) {
      throw new Error('Failed to fetch user wallet');
    }
    const fromAddress = walletResult.wallet_address;

    console.log(`Sending from address: ${fromAddress}`);

    // Fetch and decrypt the private key
    const privateKeyResult = await fetch_Private_key(ctx.chat.id);
    if (!privateKeyResult.success) {
      throw new Error('Failed to fetch private key');
    }
    const decryptedPrivateKey = decrypt(privateKeyResult.encryptedPrivateKey);

    console.log(`Private key fetched and decrypted`);

    // Verify that the private key matches the from address
    const addressFromPrivateKey = tronWeb.address.fromPrivateKey(decryptedPrivateKey);
    if (addressFromPrivateKey !== fromAddress) {
      throw new Error(`Address mismatch: ${addressFromPrivateKey} != ${fromAddress}`);
    }

    console.log(`Private key matches the from address`);

    // Convert amount to sun (1 TRX = 1,000,000 sun)
    const amountInSun = tronWeb.toSun(amount);

    // Create the transaction
    const tradeobj = await tronWeb.transactionBuilder.sendTrx(
      toAddress,
      amountInSun,
      fromAddress
    );

    console.log(`Transaction object created`);

    // Sign the transaction
    const signedtxn = await tronWeb.trx.sign(tradeobj, decryptedPrivateKey);

    console.log(`Transaction signed`);

    // Broadcast the transaction
    const receipt = await tronWeb.trx.sendRawTransaction(signedtxn);

    console.log('Transfer successful:', receipt);
    ctx.reply(`Transfer of ${amount} TRX to ${toAddress} was successful. Transaction ID: ${receipt.txid}`);
  } catch (error) {
    console.error('Error in transferTRX:', error);
    ctx.reply(`Error executing transfer: ${error.message}`);
  }
}

module.exports = transferTRX;
