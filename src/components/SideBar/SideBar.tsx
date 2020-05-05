import React from "react";
import "./SideBar.scss";
import SimulationSideBar from "../SimulationSideBar";
import TopScorer from "../TopScorer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import NodeDetailsSideBar from "../NodeDetailsSideBar";

function SideBar({ chart, stateActions }: any) {
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
              <SimulationSideBar></SimulationSideBar>
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
