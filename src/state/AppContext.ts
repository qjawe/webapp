import { createContext } from "react";

export const initialValue = {
  state: {
    graph: "Hii!!! How are you?",
    walletAddress: "",
  },
  actions: {
    setGraph: (graph: any) => {},
    setWalletAddress: (address: string) => {},
  },
};

export const AppContext = createContext(initialValue);
