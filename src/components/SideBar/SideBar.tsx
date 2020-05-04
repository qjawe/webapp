import React from "react";
import "./SideBar.scss";
import SimulationSideBar from "../SimulationSideBar";
import TopScorer from "../TopScorer";
import { IChart } from "@mrblenny/react-flow-chart";

export interface ISideBarProps {
  chart: IChart
}

function SideBar({ chart } : ISideBarProps) {
  return (
    <div className="side-bar">
      <SimulationSideBar chart={chart}></SimulationSideBar>
      <TopScorer />
    </div>
  );
}

export default SideBar;
