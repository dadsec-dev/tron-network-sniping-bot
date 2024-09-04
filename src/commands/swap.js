const { tronWeb } = require('../utils/tron');
const axios = require('axios');

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

module.exports = async function swapTokens(ctx, fromToken, toToken, amount, recipient) {
  try {
    const bestPath = await getBestPath(fromToken, toToken, amount);
    
    const routerContractAddress = 'TFVisXFaijZfeyeSjCEVkHfex7HGdTxzF9'; 
    const contract = await tronWeb.getContract(routerContractAddress)
    console.log(`contract address is: ${contract.account}`)

    
    const paths = bestPath.tokens;  
    console.log(`Paths: ${paths}`);
    
    const poolVersions = bestPath.poolVersions;  
    console.log(`Pool Versions: ${poolVersions}`);
    
    const poolLengths = [paths.length]; 
    console.log(`Pool Lengths:`, poolLengths);
    
    const fees = bestPath.poolFees.map(fee => parseInt(fee, 10));  
    console.log(`Pool Fees:`, fees);

    const amountIn = tronWeb.toBigNumber(tronWeb.toSun(parseFloat(bestPath.amountIn))); 
    const minAmountOut = tronWeb.toBigNumber(tronWeb.toSun(parseFloat(bestPath.amountOut))); 
    const deadline = tronWeb.toBigNumber(Math.floor(Date.now() / 1000) + 60 * 10); 

    const swapData = {
      amountIn: amountIn,         
      minAmountOut: minAmountOut,   
      to: recipient,                   
      deadline: deadline   
    }
     

    console.log(`swapdata is: ${swapData}`)

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
    ctx.reply(`Swap successful: ${tx}`);
  } catch (error) {
    console.error("Error executing swap:", error);
    ctx.reply(`Error executing swap: ${error.message}`);
  }
};
