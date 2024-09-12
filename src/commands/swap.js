const { tronWeb } = require('../utils/tron');
const axios = require('axios');
const { fetchWallet } = require('../service/user.service');

async function getBestPath(fromToken, toToken, amount) {
  console.log(`Getting best path for: ${fromToken} -> ${toToken}, amount: ${amount}`);
  const typeList = 'PSM,CURVE,CURVE_COMBINATION,WTRX,SUNSWAP_V1,SUNSWAP_V2,SUNSWAP_V3';
  try {
    const response = await axios.get(`https://rot.endjgfsv.link/swap/router`, {
      params: { fromToken, toToken, amountIn: amount, typeList }
    });

    if (response.data.code === 0) {
      console.log('Best path found:', response.data.data[0]);
      return response.data.data[0];
    } else {
      throw new Error('Failed to retrieve swap path');
    }
  } catch (error) {
    console.error('Error in getBestPath:', error);
    throw error;
  }
}

async function executeSwap(contract, paths, poolVersions, poolLengths, fees, swapData) {
  try {
    const tx = await contract.methods.swapExactInput(
      paths,
      poolVersions,
      poolLengths,
      fees,
      swapData
    ).send({
      feeLimit: 10000 * 1e6,
      shouldPollResponse: true
    });
    console.log("Swap transaction successful:", tx);
    return tx;
  } catch (error) {
    console.error("Error executing swap transaction:", error);
    throw error;
  }
}

module.exports = async function swapTokens(ctx, fromToken, toToken, amount) {
  try {
    // Fetch user's wallet address
    const walletResult = await fetchWallet(ctx.chat.id);
    if (!walletResult.success) {
      throw new Error('Failed to fetch user wallet');
    }
    const recipient = walletResult.wallet_address;

    // Get the best swap path
    const bestPath = await getBestPath(fromToken, toToken, amount);
    
    // Setup contract
    const routerContractAddress = 'TFVisXFaijZfeyeSjCEVkHfex7HGdTxzF9';
    const contract = await tronWeb.contract().at(routerContractAddress);
    
    // Prepare swap parameters
    const paths = bestPath.tokens;
    const poolVersions = bestPath.poolVersions;
    const poolLengths = [paths.length];
    const fees = bestPath.poolFees.map(fee => parseInt(fee, 10));

    const amountIn = tronWeb.toBigNumber(tronWeb.toSun(parseFloat(bestPath.amountIn)));
    const minAmountOut = tronWeb.toBigNumber(tronWeb.toSun(parseFloat(bestPath.amountOut)));
    const deadline = tronWeb.toBigNumber(Math.floor(Date.now() / 1000) + 60 * 10);

    const swapData = {
      amountIn,
      minAmountOut,
      to: recipient,
      deadline
    };

    // Execute the swap
    const tx = await executeSwap(contract, paths, poolVersions, poolLengths, fees, swapData);

    ctx.reply(`Swap successful! Transaction: ${tx}`);
  } catch (error) {
    console.error("Error in swapTokens:", error);
    ctx.reply(`Error executing swap: ${error.message}`);
  }
};
