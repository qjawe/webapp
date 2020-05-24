import React, { useEffect, useState } from "react";
import "./SimulationSideBar.scss";
import { buildTransaction } from "../../services/SimulationService";
import { IChart } from "@mrblenny/react-flow-chart";
import { ethers } from "ethers";
import { AppContext } from "../../state";
import { findInitialNodes } from "../../utils/ChartUtils";

import {
  FLASHLOAN_ABI,
  FLASHLOAN_ADDRESS,
  AAVE_ETHEREUM,
} from "../../constants";

declare var web3: any;

export interface ISimulationSideBarProps {
  chart: IChart;
}

function SimulationSideBar({ chart }: ISimulationSideBarProps) {
  const ctx = React.useContext(AppContext);
  const initialState = { loading: false, error: false, tx: "" };
  const [state, setState] = useState(initialState);

  useEffect(() => {
    if (!state.loading) return;
  });

  if (state.loading) {
    return <div className="simulation-side-bar"></div>;
  }

  const submitTransaction = () => {
    setState({ loading: true, error: false, tx: "" });
    buildTransaction(chart).then(
      (tx: any) => {
        console.log("Enter buildTransaction");
        setState({ loading: false, error: false, tx: JSON.stringify(tx) });
        const provider = new ethers.providers.Web3Provider(
          web3.currentProvider
        );
        const signer = provider.getSigner();

        const Executor = new ethers.Contract(
          FLASHLOAN_ADDRESS,
          FLASHLOAN_ABI,
          signer
        );
        const legs = tx.map((item: any) => {
          return { to: item.to, input: item.input, value: "0", callType: 0 };
        });

        const initalNodes = findInitialNodes(chart);

        if (initalNodes.length !== 1) {
          setState({ loading: false, error: true, tx: "" });
        }

        const ethAmount = Object.values(initalNodes[0].ports)[0].properties
          .amount;
        const amount = ethers.utils.parseEther(ethAmount);
        console.log(AAVE_ETHEREUM, amount, legs)

        Executor.run(AAVE_ETHEREUM, amount, legs).then(() => {
          console.log("done");
        });
      }
      // (x: any) => {
      //   setState({ loading: false, error: true, tx: "" });
      // }
    );
  };

  return (
    <div className="simulation-side-bar">
      <div className="simulation-title">Simulation</div>
      <div className="simulation-summary">
        <div className="simulation-summary-item">
          {state.error ? "Error" : state.tx}
        </div>
      </div>
      <div className="simulation-button-container">
        <button
          type="button"
          className="simulation-button"
          onClick={submitTransaction}
          disabled={!ctx.state.walletAddress}
        >
          Execute Transaction
        </button>
      </div>
    </div>
  );
}

export default SimulationSideBar;
