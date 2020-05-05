import React from "react";
import "./MainView.scss";
import ChartTopBar from "../ChartTopBar";
import ChartView from "../ChartView";
import SideBar from "../SideBar";
import { useChart } from "../../hooks";

function MainView() {
  const [chart, setChart, stateActions] = useChart();

  return (
    <div className="main-view">
      <div className="chat-view-container">
        <ChartTopBar />
        <ChartView chart={chart} stateActions={stateActions} />
      </div>
      <div className="simulation-container">
        <SideBar
          chart={chart}
          setChart={setChart}
          stateActions={stateActions}
        />
      </div>
    </div>
  );
}

export default MainView;
