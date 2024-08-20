const TronWeb = require('tronweb');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const privateKey = process.env.PRIVATE_KEY;
const apiKey = process.env.API_KEY;

const tronWeb = new TronWeb({
  fullHost: "https://api.trongrid.io",  // Using Nile Testnet
  headers: { "TRON-PRO-API-KEY": apiKey },
  privateKey: privateKey,
});

async function getBestPath(fromToken, toToken, amount) {
    console.log(`fromToken: ${fromToken}, toToken: ${toToken}, amount: ${amount}`)
  const typeList = 'PSM,CURVE,CURVE_COMBINATION,WTRX,SUNSWAP_V1,SUNSWAP_V2,SUNSWAP_V3';
  const response = await axios.get(`https://rot.endjgfsv.link/swap/router`, {
    params: {
      fromToken,
      toToken,
      amountIn: amount,
      typeList
    }
  });

  console.log('API Response:', response.data); 

  if (response.data.code === 0) {
    console.log(`response from path generator: ${response.data.data[0]}`) 
    return response.data.data[0];
  } else {
    throw new Error('Failed to retrieve swap path');
  }
}

async function swapTokens(fromToken, toToken, amount, recipient) {
  try {
    let abi = [{"inputs":[{"internalType":"address","name":"_v2Router","type":"address"},{"internalType":"address","name":"_v1Foctroy","type":"address"},{"internalType":"address","name":"_psmUsdd","type":"address"},{"internalType":"address","name":"_v3Router","type":"address"},{"internalType":"address","name":"_wtrx","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"pool","type":"address"},{"indexed":false,"internalType":"address[]","name":"tokens","type":"address[]"}],"name":"AddPool","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"admin","type":"address"},{"indexed":true,"internalType":"address","name":"pool","type":"address"},{"indexed":false,"internalType":"address[]","name":"tokens","type":"address[]"}],"name":"ChangePool","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"buyer","type":"address"},{"indexed":true,"internalType":"uint256","name":"amountIn","type":"uint256"},{"indexed":false,"internalType":"uint256[]","name":"amountsOut","type":"uint256[]"}],"name":"SwapExactETHForTokens","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"buyer","type":"address"},{"indexed":true,"internalType":"uint256","name":"amountIn","type":"uint256"},{"indexed":false,"internalType":"uint256[]","name":"amountsOut","type":"uint256[]"}],"name":"SwapExactTokensForTokens","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"originOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"TransferAdminship","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"originOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"TransferOwnership","type":"event"},{"stateMutability":"payable","type":"fallback"},{"inputs":[],"name":"WTRX","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"poolVersion","type":"string"},{"internalType":"address","name":"pool","type":"address"},{"internalType":"address[]","name":"tokens","type":"address[]"}],"name":"addPool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"poolVersion","type":"string"},{"internalType":"address","name":"pool","type":"address"},{"internalType":"address","name":"gemJoin","type":"address"},{"internalType":"address[]","name":"tokens","type":"address[]"}],"name":"addPsmPool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"poolVersion","type":"string"},{"internalType":"address","name":"pool","type":"address"},{"internalType":"address[]","name":"tokens","type":"address[]"}],"name":"addUsdcPool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"admin","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"pool","type":"address"},{"internalType":"address[]","name":"tokens","type":"address[]"}],"name":"changePool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"poolVersion","type":"string"}],"name":"isPsmPool","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"poolVersion","type":"string"}],"name":"isUsdcPool","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"psmUsdd","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"retrieve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"string[]","name":"poolVersion","type":"string[]"},{"internalType":"uint256[]","name":"versionLen","type":"uint256[]"},{"internalType":"uint24[]","name":"fees","type":"uint24[]"},{"components":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"internalType":"struct SmartExchangeRouter.SwapData","name":"data","type":"tuple"}],"name":"swapExactInput","outputs":[{"internalType":"uint256[]","name":"amountsOut","type":"uint256[]"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"newAdmin","type":"address"}],"name":"transferAdminship","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountMinimum","type":"uint256"},{"internalType":"address","name":"recipient","type":"address"}],"name":"unwrapWTRX","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"v1Factory","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"v2Router","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"v3Router","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"stateMutability":"payable","type":"receive"}]
    console.log(`Getting the best routes for swap...`)
    const bestPath = await getBestPath(fromToken, toToken, amount);

    console.log(`configuring swap router ....`);


    const routerContractAddress = 'TFVisXFaijZfeyeSjCEVkHfex7HGdTxzF9'; 
    console.log(`routerContractAddress: ${routerContractAddress}`);


    const contract = await tronWeb.contract().at(routerContractAddress);
    // const contract = await tronWeb.trx.getContract(routerContractAddress);
    console.log(`contract: ${contract}`);

    // let contract = await tronWeb.contract(abi, routerContractAddress);

    const paths = bestPath.tokens;
    console.log(`paths: ${paths}`);

    const poolVersions = bestPath.poolVersions;
    console.log(`poolVersions: ${poolVersions}`);

    const poolLengths = [paths.length];
    console.log(`poolLengths: ${poolLengths}`);

    const fees = bestPath.poolFees;
    console.log(`fees: ${fees}`);

    // Use decimal values directly (as strings)
    const amountIn = bestPath.amountIn.toString();
    console.log(`amountIn: ${amountIn}`);

    const minAmountOut = bestPath.amountOut.toString();
    console.log(`minAmountOut: ${minAmountOut}`);

    // Keep the deadline as an integer timestamp
    const deadline = Math.floor(Date.now() / 1000) + 60 * 10;
    console.log(`deadline: ${deadline}`);

    // Construct the swap data with proper types
    const swapData = [amountIn, minAmountOut, recipient, deadline];
    console.log(`swapData: ${swapData}`);

    const tx = await contract.swapExactInput(
      paths,
      poolVersions,
      poolLengths,
      fees,
      [swapData]
    ).send({
      feeLimit: 100_000_000,
      shouldPollResponse: true
    });

    console.log("Swap transaction successful:", tx);
  } catch (error) {
    console.error("Error executing swap:", error);
  }
}

// Example usage
const fromToken = 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t'; // usdt token address
const toToken = 'TEkxiTehnzSmSe2XqrBj4w32RUN966rdz8';   // usdc token address
const amount = '10000000';
const recipient = 'TFdWNRABSCZEQpXzNjDHVcR2cyfN79vJAt';  // Example recipient address

swapTokens(fromToken, toToken, amount, recipient);
