import React from "react";
import "./ChartView.scss";
import { FlowChart } from "@mrblenny/react-flow-chart";

function ChartView({ chart, stateActions }: any) {
  return (
    <div className="chart-view">
      <FlowChart chart={chart} callbacks={stateActions} />
    </div>
  );
}

export default ChartView;
