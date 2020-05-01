import Web3 from "web3";
import Web3Modal from "web3modal";
import "./web3wallets.d.ts";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Portis from "@portis/web3";
import Torus from "@toruslabs/torus-embed";
import Authereum from "authereum";
import BurnerConnectProvider from "@burner-wallet/burner-connect-provider";
import Notify from "bnc-notify";

const providerOptions = {
  /* See Provider Options Section */
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      infuraId: "INFURA_ID", // required
    },
  },
  portis: {
    package: Portis, // required
    options: {
      id: "PORTIS_ID", // required
    },
  }, //
  torus: {
    package: Torus, // required
  },
  authereum: {
    package: Authereum, // required
  },
  burnerconnect: {
    package: BurnerConnectProvider, // required
  },
};

const web3Modal = new Web3Modal({
  cacheProvider: true, // optional
  providerOptions, // required
});

let web3;

export const notify = Notify({
  dappId: "", // [String] The API key created by step one above
  networkId: 1, // [Integer] The Ethereum network ID your Dapp uses.
});

export const connectWallet = async () => {
  const provider = await web3Modal.connect();
  web3 = new Web3(provider);
  const walletAddress = await web3.eth.getAccounts();
  return walletAddress[0];
};
