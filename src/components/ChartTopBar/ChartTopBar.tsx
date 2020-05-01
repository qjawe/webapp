import React from "react";
import "./ChartTopBar.scss";
import ToolboxItem from "../ToolboxItem";

function ChartTopBar() {
  return (
    <div className="chart-top-bar">
      <ToolboxItem
        type="flash-loan"
        ports={{
          port1: {
            id: "port1",
            type: "bottom",
            properties: {
              custom: "property",
            },
          },
        }}
        properties={{
          name: "Aave",
          type: "initial",
        }}
      />
      <ToolboxItem
        type="flash-loan"
        ports={{
          port1: {
            id: "port1",
            type: "bottom",
            properties: {
              custom: "property",
            },
          },
        }}
        properties={{
          name: "Uniswap",
          type: "initial",
        }}
      />
    </div>
  );
}

export default ChartTopBar;
