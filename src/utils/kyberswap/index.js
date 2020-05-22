const Web3 = require("web3");
const Tx = require("ethereumjs-tx").Transaction;
const BN = require("bn.js");
const fetch = require('node-fetch');
import {KYBER_NETWORK_PROXY_ABI, KYBER_NETWORK_PROXY_ADDRESS} from "../../constants"
// Connecting to ropsten infura node
const NETWORK = "ropsten"
const PROJECT_ID = "0bd3920316e94e9ca331d62dbe7b0eb6"
const WS_PROVIDER = `wss://${NETWORK}.infura.io/ws/v3/${PROJECT_ID}`
const web3 = new Web3(new Web3.providers.WebsocketProvider(WS_PROVIDER));

// // Token Details
// const SRC_TOKEN = "ETH";
// const DST_TOKEN = "ZIL";
// const SRC_TOKEN_ADDRESS = "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";
// const DST_TOKEN_ADDRESS = "0xaD78AFbbE48bA7B670fbC54c65708cbc17450167";
// const SRC_DECIMALS = 18;
// const DST_DECIMALS = 12;
// const MAX_ALLOWANCE = "115792089237316195423570985008687907853269984665640564039457584007913129639935";

// Trade Details
const SRC_QTY = "1";
const SRC_QTY_WEI = (SRC_QTY * 10 ** SRC_DECIMALS).toString();

// User Details
const PRIVATE_KEY = Buffer.from("7289DD1ACD49795D2FB233A966957255D3076CF276A07A6C24F8D3667BF0FD9C", "hex"); //exclude 0x prefix
const USER_ADDRESS = web3.eth.accounts.privateKeyToAccount(
  "0x" + PRIVATE_KEY.toString("hex")
).address;

// Wallet Address for Fee Sharing Program
//If none, set to 0x0000000000000000000000000000000000000000 (null address)
const REF_ADDRESS = "0x483C5100C3E544Aef546f72dF4022c8934a6945E";
//const REF_ADDRESS = "0x0000000000000000000000000000000000000000"

// Get the KyberNetworkContract instances
const KYBER_NETWORK_PROXY_CONTRACT = new web3.eth.Contract(
  KYBER_NETWORK_PROXY_ABI,
  KYBER_NETWORK_PROXY_ADDRESS
);

async function main() {
  // Obtain slippage rate
  let results = await getRates(SRC_TOKEN_ADDRESS, DST_TOKEN_ADDRESS, SRC_QTY_WEI);

  //Convert ETH to ZIL
  await trade(
    SRC_TOKEN_ADDRESS,
    SRC_QTY_WEI,
    DST_TOKEN_ADDRESS,
    USER_ADDRESS,
    MAX_ALLOWANCE,
    results.slippageRate,
    REF_ADDRESS
  );
  // Quit the program
  process.exit(0);
}

// Function to obtain conversion rate between src token and dst token
async function getRates(SRC_TOKEN_ADDRESS,DST_TOKEN_ADDRESS,SRC_QTY_WEI) {
  return await KYBER_NETWORK_PROXY_CONTRACT.methods
    .getExpectedRate(SRC_TOKEN_ADDRESS, DST_TOKEN_ADDRESS, SRC_QTY_WEI)
    .call();
}

// Function to convert src token to dst token
async function trade(
  srcTokenAddress,
  srcQtyWei,
  dstTokenAddress,
  dstAddress,
  maxDstAmount,
  minConversionRate,
  walletId
) {
  console.log(`Converting ${SRC_TOKEN} to ${DST_TOKEN}`);
  let txData = await KYBER_NETWORK_PROXY_CONTRACT.methods
    .trade(
      srcTokenAddress,
      srcQtyWei,
      dstTokenAddress,
      dstAddress,
      maxDstAmount,
      minConversionRate,
      walletId
    )
    .encodeABI();
  let gasLimit = await getGasLimit(SRC_TOKEN_ADDRESS, DST_TOKEN_ADDRESS, SRC_QTY);
  await broadcastTx(
    USER_ADDRESS,
    KYBER_NETWORK_PROXY_ADDRESS,
    txData,
    srcQtyWei, //Ether value to be included in the tx
    gasLimit //gasLimit
  );
}

// Function to get gas limit for trading
async function getGasLimit(source, dest, amount) {
  let gasLimitRequest = await fetch(`https://${NETWORK == "mainnet" ? "" : NETWORK + "-"}api.kyber.network/gas_limit?source=${source}&dest=${dest}&amount=${amount}`);
  let gasLimit = await gasLimitRequest.json();
  return gasLimit.data;
}

// Function to broadcast transactions
async function broadcastTx(from, to, txData, value, gasLimit) {
  let txCount = await web3.eth.getTransactionCount(USER_ADDRESS);
  //Method 1: Use a constant
  let gasPrice = new BN(5).mul(new BN(10).pow(new BN(9))); //5 Gwei
  //Method 2: Use web3 gasPrice
  //let gasPrice = await web3.eth.gasPrice;
  //Method 3: Use KNP Proxy maxGasPrice
  //let gasPrice = await KYBER_NETWORK_PROXY_CONTRACT.maxGasPrice().call();

  let maxGasPrice = await KYBER_NETWORK_PROXY_CONTRACT.methods
    .maxGasPrice()
    .call();
  //If gasPrice exceeds maxGasPrice, set it to max.
  if (gasPrice >= maxGasPrice) gasPrice = maxGasPrice;

  let rawTx = {
    from: from,
    to: to,
    data: txData,
    value: web3.utils.toHex(value),
    gasLimit: web3.utils.toHex(gasLimit),
    gasPrice: web3.utils.toHex(gasPrice),
    nonce: txCount
  };

  let tx = new Tx(rawTx, { chain: NETWORK, hardfork: 'petersburg' });;

  tx.sign(PRIVATE_KEY);
  const serializedTx = tx.serialize();
  txReceipt = await web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
  .catch(error => console.log(error));

  // Log the tx receipt
  console.log(txReceipt);
  return;
}

main();