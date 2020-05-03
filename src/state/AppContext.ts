import { createContext } from "react";

export const initialValue = {
  state: {
    walletAddress: "",
  },
  actions: {
    setWalletAddress: (address: string) => {},
  },
};

export const AppContext = createContext(initialValue);
