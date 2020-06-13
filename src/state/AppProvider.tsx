import React, { useState } from "react";
import { AppContext, initialValue } from "./AppContext";

export const AppProvider = (props: any) => {
  const [globalState, setGlobalState] = useState(initialValue);

  const setWalletConfig = (address: string, balance: string) => {
    setGlobalState({
      ...globalState,
      state: {
        ...globalState.state,
        walletAddress: address,
        walletBalance: balance
      }
    });
  };
  const setModalConfig = (openModal: boolean, config?: any) => {
    if (openModal) {
      setGlobalState({
        ...globalState,
        state: {
          ...globalState.state,
          openModal: openModal,
          modalConfig: config
        }
      });
    } else {
      setGlobalState({
        ...globalState,
        state: {
          ...globalState.state,
          openModal: openModal,
          modalConfig: {
            type: ""
          }
        }
      });
    }
  };
  const actions = {
    setWalletConfig,
    setModalConfig
  };
  return (
    <AppContext.Provider value={{ state: globalState.state, actions }}>
      {props.children}
    </AppContext.Provider>
  );
};
