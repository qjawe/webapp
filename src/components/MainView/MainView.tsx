import React from "react";
import "./MainView.scss";
import ChartTopBar from "../ChartTopBar";
import ChartView from "../ChartView";
import SideBar from "../SideBar";
import { useChart } from "../../hooks";
import { AppContext } from "../../state";
import { IChart } from "@mrblenny/react-flow-chart";

function MainView() {
  const [chart, , stateActions] = useChart();
  const chart2 = chart as IChart; 

  return (
    <div className="main-view">
      <div className="chat-view-container">
        <ChartTopBar />
        <ChartView chart={chart} stateActions={stateActions} />
      </div>
      <div className="simulation-container">
        <SideBar chart={chart2} stateActions={stateActions} />
      </div>
    </div>
  );
}

export default MainView;
