import React from "react";
import "./ChartTopBar.scss";
import ToolboxItem from "../ToolboxItem";
import { Aave, Uniswap } from "../../services/BlocksService";

function ChartTopBar() {
  const aave = Aave();
  const uniswap = Uniswap();

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
        properties={aave}
      />
      <ToolboxItem
        type="exchange"
        ports={{
          port1: {
            id: "port1",
            type: "bottom",
            properties: {
              custom: "property",
            },
          },
        }}
        properties={uniswap}
      />
    </div>
  );
}

export default ChartTopBar;
