import React, { useEffect } from "react";
import "./SimulationSideBar.scss";
import { buildTransaction} from "../../services/SimulationService";
import { IChart } from "@mrblenny/react-flow-chart";

export interface ISimulationSideBarProps {
  chart: IChart
}

function SimulationSideBar({ chart } : ISimulationSideBarProps) {
  useEffect(() => {
    buildTransaction(chart).then((x : any) => {
      ;
    },(x: any) => {
      ;
    });
  });

  return (
    <div className="simulation-side-bar">
      <div className="simulation-title">Simulation</div>
      <div className="simulation-summary">
        <div className="simulation-summary-item">P/L: 1.3 ETH</div>
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
