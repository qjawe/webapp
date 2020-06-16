import React from "react";
import "./MainView.scss";
import ChartTopBar from "../ChartTopBar";
import ChartView from "../ChartView";
import SideBar from "../SideBar";
import { useChart } from "../../hooks";
import { ISideBarProps } from "../SideBar/models";
import Modal from "../Modal";

function MainView() {
  const { chart, setChart, stateActions }: ISideBarProps = useChart();

  console.log("Main view rendering");

  return (
    <div className="main-view">
      <div className="chat-view-container">
        <ChartTopBar chart={chart} />
        <ChartView chart={chart} stateActions={stateActions} />
      </div>
      <div className="simulation-container">
        <SideBar
          chart={chart}
          setChart={setChart}
          stateActions={stateActions}
        />
      </div>
      <Modal setChart={setChart} />
    </div>
  );
}

export default MainView;
