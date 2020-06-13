import { createContext } from "react";

export const initialValue = {
  state: {
    walletAddress: "",
    walletBalance: "0",
    openModal: false,
    modalConfig: {
      type: ""
    }
  },
  actions: {
    setWalletConfig: (address: string, balance: string) => {},
    setModalConfig: (openModal: boolean, config?: any) => {}
  }
};

export const AppContext = createContext(initialValue);
