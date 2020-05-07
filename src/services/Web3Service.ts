import Web3 from "web3";
import Notify from "bnc-notify";
import Onboard from "bnc-onboard";
import {
  UNISWAP_ADDRESS,
  UNISWAP_ABI,
  FLASHLOAN_ABI,
  ERC20_ABI,
} from "../constants";
import { ethers } from "ethers";

const FORTMATIC_KEY = "";
const INFURA_KEY = "";
const PORTIS_KEY = "";

let web3;
let userAddress;
const wallets = [
  { walletName: "metamask", preferred: true },
  { walletName: "torus", preferred: true },
  // {
  //   walletName: "portis",
  //   apiKey: PORTIS_KEY,
  //   preferred: true,
  //   label: "Login with Email",
  // },
  { walletName: "coinbase", preferred: true },
  // {
  //   walletName: "fortmatic",
  //   apiKey: FORTMATIC_KEY,
  //   preferred: true,
  // },
  { walletName: "authereum", preferred: true },
  // {
  //   walletName: "walletConnect",
  //   infuraKey: INFURA_KEY,
  // },
];
const onboard = Onboard({
  dappId: "052b3fe9-87d5-4614-b2e9-6dd81115979a", // [String] The API key created by step one above
  networkId: 42, // [Integer] The Ethereum network ID your Dapp uses.
  subscriptions: {
    wallet: (wallet: any) => {
      web3 = new Web3(wallet.provider);
    },
    address: (address:any) =>{
    userAddress = address;
    }
  },
  darkMode: true,
  walletSelect: {
    wallets,
  },
});

// export const notify = Notify({
//   dappId: "052b3fe9-87d5-4614-b2e9-6dd81115979a", // [String] The API key created by step one above
//   networkId: 1, // [Integer] The Ethereum network ID your Dapp uses.
// });

export const connectWallet = async () => {
  let address = "";
  try {
    await onboard.walletSelect();
    await onboard.walletCheck();
    const currentState = onboard.getState();

    address = currentState.address;
  } catch (err) {
    console.log(err);
  }
  return address;
};

export const execute = async (txLegs: any) => {
  let provider = ethers.getDefaultProvider("kovan");
  let privateKey =
    "0x6C4A2BBF10D87E5C19B40F9C87C08E1E46F61D246200970B9EF5218597D3FBEE";
  let wallet = new ethers.Wallet(privateKey, provider);
  let lendingPool = "0x506B0B2CF20FAA8f38a4E2B524EE43e1f4458Cc5";
  let factory = new ethers.ContractFactory(
    FLASHLOAN_ABI.abi,
    FLASHLOAN_ABI.bytecode,
    wallet
  );
  let contract = await factory.deploy(lendingPool, txLegs);
  console.log("Deployed contract ", contract.address);
  await contract.deployed();
};
