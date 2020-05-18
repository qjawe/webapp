import React, { useEffect, useState } from "react";
import "./SimulationSideBar.scss";
import { buildTransaction } from "../../services/SimulationService";
import { IChart } from "@mrblenny/react-flow-chart";
// import { flashloan, deployContract } from "../../services/Web3Service";
import { ethers } from "ethers";
import { AppContext } from "../../state";

import { 
  FLASHLOAN_ABI,
  FLASHLOAN_ADDRESS,
  AAVE_ETHEREUM,
  AAVE_PROVIDER } from "../../constants";

declare var web3 : any;

export interface ISimulationSideBarProps {
  chart: IChart;
}

function SimulationSideBar({ chart }: ISimulationSideBarProps) {
  const ctx = React.useContext(AppContext);
  const initialState = { loading: true, error: false, tx: "" };
  const [state, setState] = useState(initialState);

  useEffect(() => {
    if (!state.loading) return;

    buildTransaction(chart).then(
      (x: any) => {
        setState({ loading: false, error: false, tx: JSON.stringify(x) });
      },
      (x: any) => {
        setState({ loading: false, error: true, tx: "" });
      }
    );
  });
  
  const executeTransaction = async () => {
    console.log(chart.nodes.node1.ports.port1.properties.amount);
    console.log(chart.nodes.node1.ports.port1.properties.type);
    // const asset = chart.nodes.node1.ports.port1.properties.asset;
    const txLegs = await buildTransaction(chart);
    console.log(txLegs);
    // const flashLoanExecutor = await deployContract(txLegs);
    // const tx = await flashloan(flashLoanExecutor, asset);
  };

  if (state.loading) {
    return <div className="simulation-side-bar"></div>;
  }

  const submitTransaction = () => {
    const provider = new ethers.providers.Web3Provider(web3.currentProvider);
    const signer = provider.getSigner();

    const Executor = new ethers.Contract(FLASHLOAN_ADDRESS, FLASHLOAN_ABI, signer);
    const legs = JSON.parse(state.tx).map((item: any) => {
      return { to: item.to,
       input: item.txData,
       value: "0",
       callType: 0, }});

    const amount = ethers.utils.parseEther("0.5");

    Executor.run(AAVE_ETHEREUM, amount, legs).then(() => { console.log('done' )});
    //Executor.run(AAVE_ETHEREUM, amount, []).then(() => { console.log('done' )});
  }

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
