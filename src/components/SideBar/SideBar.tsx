import React from "react";
import "./SideBar.scss";
import SimulationSideBar from "../SimulationSideBar";
import TopScorer from "../TopScorer";

function SideBar() {
  return (
    <div className="side-bar">
      <SimulationSideBar></SimulationSideBar>
      <TopScorer />
    </div>
  );
}

export default SideBar;
