import Web3 from "web3";
import Notify from "bnc-notify";
import Onboard from "bnc-onboard";

const FORTMATIC_KEY = "";
const INFURA_KEY = "";
const PORTIS_KEY = "";

let web3;
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
  networkId: 1, // [Integer] The Ethereum network ID your Dapp uses.
  subscriptions: {
    wallet: (wallet: any) => {
      web3 = new Web3(wallet.provider);
    },
  },
  darkMode: true,
  walletSelect: {
    wallets,
  },
});

export const notify = Notify({
  dappId: "052b3fe9-87d5-4614-b2e9-6dd81115979a", // [String] The API key created by step one above
  networkId: 1, // [Integer] The Ethereum network ID your Dapp uses.
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
