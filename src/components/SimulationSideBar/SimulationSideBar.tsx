import React, { useEffect, useState } from "react";
import "./SimulationSideBar.scss";
import { buildTransaction} from "../../services/SimulationService";
import { IChart } from "@mrblenny/react-flow-chart";
import { ethers } from "ethers";

import { FACTORY_ADDRESS, FACTORY_ABI, AAVE_ETHEREUM } from "../../constants";
import Web3 from "web3";
import { AsyncSendable } from "ethers/providers";

export interface ISimulationSideBarProps {
  chart: IChart;
}

function SimulationSideBar({ chart } : ISimulationSideBarProps) {
  const initialState = { loading: true, error: false, tx: "" };
  const [ state, setState ] = useState(initialState);

  useEffect(() => {
    if (!state.loading) return;

    buildTransaction(chart).then((x : any) => {
      setState({ loading: false, error: false, tx: JSON.stringify(x) });
    },(x: any) => {
      setState({ loading: false, error: true, tx: "" });
    });
  });

  if (state.loading) {
    return (
      <div className="simulation-side-bar">
      </div>
    );
  }

  const submitTransaction = () => {
    const web3 = new Web3();
    const provider = new ethers.providers.Web3Provider(web3.currentProvider as AsyncSendable);
    const signer = provider.getSigner();

    const Factory = new ethers.Contract(FACTORY_ADDRESS, FACTORY_ABI, signer);
    const legs = JSON.parse(state.tx).map((item: any) => {
      return { to: item.to,
       input: item.txData,
       value: 0, }});
    Factory.execute(AAVE_ETHEREUM, legs).then(() => { console.log('done' )});
  }

  return (
    <div className="simulation-side-bar">
      <div className="simulation-title">Simulation</div>
      <div className="simulation-summary">
      <div className="simulation-summary-item">{state.error ? "Error"  : state.tx}</div>
      </div>
      <div className="simulation-button-container">
        <button onClick={submitTransaction} type="button" className="simulation-button" disabled={state.tx ? false : true}>
          Execute Transaction
        </button>
      </div>
    </div>
  );
}

export default SimulationSideBar;
