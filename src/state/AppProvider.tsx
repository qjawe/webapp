import React, { useState } from "react";
import { AppContext, initialValue } from "./AppContext";

export const AppProvider = (props: any) => {
  const [globalState, setGlobalState] = useState(initialValue);

  const setWalletConfig = (address: string, balance: string) => {
    console.log(address);
    setGlobalState({
      ...globalState,
      state: {
        ...globalState.state,
        walletAddress: address,
        walletBalance: balance,
      },
    });
  };
  const actions = {
    setWalletConfig,
  };
  return (
    <AppContext.Provider value={{ state: globalState.state, actions }}>
      {props.children}
    </AppContext.Provider>
  );
};
