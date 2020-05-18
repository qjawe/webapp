import Web3 from "web3";
// import Notify from "bnc-notify";
import Onboard from "bnc-onboard";
import {
  // UNISWAP_ADDRESS,
  // UNISWAP_ABI,
  FLASHLOAN_ABI,
  // ERC20_ABI,
} from "../constants";
import { ethers } from "ethers";

// const FORTMATIC_KEY = "";
// const INFURA_KEY = "";
// const PORTIS_KEY = "05b61a65-6437-4caa-a8d1-517dc1a10742";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let web3;
// let userAddress = "";
// let userBalance = "0";
// const wallets = [
//   { walletName: "metamask", preferred: true },
//   { walletName: "torus", preferred: true },
//   {
//     walletName: "portis",
//     apiKey: PORTIS_KEY,
//     preferred: true,
//     label: "Login with Email",
//   },
//   { walletName: "coinbase", preferred: true },
//   // {
//   //   walletName: "fortmatic",
//   //   apiKey: FORTMATIC_KEY,
//   //   preferred: true,
//   // },
//   { walletName: "authereum", preferred: true },
//   // {
//   //   walletName: "walletConnect",
//   //   infuraKey: INFURA_KEY,
//   // },
// ];
const onboard = Onboard({
  dappId: "052b3fe9-87d5-4614-b2e9-6dd81115979a", // [String] The API key created by step one above
  networkId: 42, // [Integer] The Ethereum network ID your Dapp uses.
  subscriptions: {
    wallet: (wallet: any) => {
      web3 = new Web3(wallet.provider);
    },
    // balance: (balance: string) => {
    //   userBalance = ethers.utils.formatEther(
    //     ethers.utils.bigNumberify(balance)
    //   );
    //   console.log(userBalance);
    // },
  },
  darkMode: true,
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

export const getWalletBalance = async () => {
  const currentState = onboard.getState();
  const balance = currentState.balance;
  console.log(balance);
  let userBalance = "0";
  if (balance) {
    userBalance = ethers.utils.formatEther(ethers.utils.bigNumberify(balance));
  }

  return userBalance;
};

export const disConnectWallet = () => {
  onboard.walletReset();
};

export const deployContract = async (txLegs: any) => {
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
  // console.log("Deployed contract ", contract.address);
  await contract.deployed();
  return contract.address;
};

export const flashloan = async (
  contractAddress: string,
  assetAddress: string
) => {
  let provider = ethers.getDefaultProvider("kovan");
  let flashLoanExecutor = new ethers.Contract(
    contractAddress,
    FLASHLOAN_ABI,
    provider
  );
  let tx = await flashLoanExecutor.testFlashLoan(
    assetAddress,
    ethers.utils.bigNumberify("10000000000000000000")
  );
  tx.then((rcpt: any) => {
    console.log("Transaction receipt ", rcpt);
  });
};
