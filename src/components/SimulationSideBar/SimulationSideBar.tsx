import React, { useEffect, useState } from "react";
import "./SimulationSideBar.scss";
import { buildTransaction} from "../../services/SimulationService";
import { IChart } from "@mrblenny/react-flow-chart";
import { execute } from "../../services/Web3Service";

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

const executeTransaction = async () => {
  console.log(chart.nodes.node1.ports.port1.properties.amount)
  console.log(chart.nodes.node1.ports.port1.properties.type)
  console.log(chart.nodes.node1.ports.port1.properties.asset)
  const txLegs = await buildTransaction(chart);
  console.log(txLegs)
  execute(txLegs);
}

  if (state.loading) {
    return (
      <div className="simulation-side-bar">
      </div>
    );
  }

  return (
    <div className="simulation-side-bar">
      <div className="simulation-title">Simulation</div>
      <div className="simulation-summary">
      <div className="simulation-summary-item">{state.error ? "Error"  : state.tx}</div>
      </div>
      <div className="simulation-button-container">
        <button type="button" className="simulation-button" onClick={executeTransaction} >
          Execute Transaction
        </button>
      </div>
    </div>
  );
}

export default SimulationSideBar;
