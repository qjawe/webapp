import React from "react";
import "./SimulationSideBar.scss";

function SimulationSideBar() {
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
