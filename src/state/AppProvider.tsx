import React, { useState } from "react";
import { AppContext, initialValue } from "./AppContext";

export const AppProvider = (props: any) => {
  const [globalState, setGlobalState] = useState(initialValue);
  const setGraph = (graph: any) => {
    setGlobalState({ ...globalState, state: { ...globalState.state, graph } });
  };
  const setWalletAddress = (address: string) => {
    setGlobalState({
      ...globalState,
      state: { ...globalState.state, walletAddress: address },
    });
  };
  const actions = {
    setGraph,
    setWalletAddress,
  };
  return (
    <AppContext.Provider value={{ state: globalState.state, actions }}>
      {props.children}
    </AppContext.Provider>
  );
};
