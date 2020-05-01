import * as chartActions from "@mrblenny/react-flow-chart/src/container/actions";
import { createContext } from "react";
import { chartSimple } from "../misc/exampleChartState";

export const initialValue = {
  state: {
    walletAddress: "",
  },
  actions: {
    setWalletAddress: (address: string) => {},
  },
};

export const AppContext = createContext(initialValue);
