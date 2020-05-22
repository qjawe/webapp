import Web3 from "web3";
import Onboard from "bnc-onboard";
import { ethers } from "ethers";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let web3;

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
