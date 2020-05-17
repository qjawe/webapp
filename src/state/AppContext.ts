import { createContext } from "react";

export const initialValue = {
  state: {
    walletAddress: "",
    walletBalance: "0",
  },
  actions: {
    setWalletConfig: (address: string, balance: string) => {},
  },
};

export const AppContext = createContext(initialValue);
