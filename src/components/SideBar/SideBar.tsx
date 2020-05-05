import React from "react";
import "./SideBar.scss";
import SimulationSideBar from "../SimulationSideBar";
import TopScorer from "../TopScorer";
import { IChart } from "@mrblenny/react-flow-chart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import NodeDetailsSideBar from "../NodeDetailsSideBar";

export interface ISideBarProps {
  chart: IChart;
  stateActions: any;
}

function SideBar({ chart, stateActions }: ISideBarProps) {
  const [collapsed, setCollapsed] = React.useState(false);
  return (
    <div className="side-bar">
      <div className="collapse-bar" onClick={(e) => setCollapsed(!collapsed)}>
        {collapsed && (
          <div className="collapse-bar-left">
            <FontAwesomeIcon icon={faChevronLeft} />
          </div>
        )}
        {!collapsed && (
          <div className="collapse-bar-right">
            <FontAwesomeIcon icon={faChevronRight} />
          </div>
        )}
        <div className="collapse-bar-pipe">|</div>
      </div>
      {!collapsed && (
        <div>
          {!chart.selected.id && (
            <div className="side-bar-container">
              <SimulationSideBar chart={chart}></SimulationSideBar>
              <TopScorer />
            </div>
          )}
          {chart.selected.id && (
            <div className="side-bar-node-details">
              <NodeDetailsSideBar chart={chart} stateActions={stateActions} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SideBar;
