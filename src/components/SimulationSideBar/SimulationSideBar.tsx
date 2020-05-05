import React, { useEffect, useState } from "react";
import "./SimulationSideBar.scss";
import { buildTransaction} from "../../services/SimulationService";
import { IChart } from "@mrblenny/react-flow-chart";

export interface ISimulationSideBarProps {
  chart: IChart
}

function SimulationSideBar({ chart } : ISimulationSideBarProps) {
  const initialState = { loading: true, error: false, tx: null };
  const [ state, setState ] = useState(initialState);

  useEffect(() => {
    if (!state.loading) return;

    buildTransaction(chart).then((x : any) => {
      setState({ loading: false, error: false, tx: x });
    },(x: any) => {
      setState({ loading: false, error: true, tx: null });
    });
  });

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
        <button type="button" className="simulation-button">
          Execute Transaction
        </button>
      </div>
    </div>
  );
}

export default SimulationSideBar;
