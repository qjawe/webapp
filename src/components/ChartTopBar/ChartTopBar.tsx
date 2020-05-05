import React from "react";
import "./ChartTopBar.scss";
import ToolboxItem from "../ToolboxItem";

function ChartTopBar() {
  return (
    <div className="chart-top-bar">
      <ToolboxItem
        type="Aave:Flash Loan"
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
          name: "Aave:Flash Loan",
          type: "initial",
        }}
      />
      <ToolboxItem
        type="Uniswap:Swap"
        ports={{
          port1: {
            id: "port1",
            type: "top",
            properties: {
              custom: "property",
            },
          },
          port2: {
            id: "port2",
            type: "bottom",
            properties: {
              custom: "property",
            },
          },
        }}
        properties={{
          name: "Uniswap:Swap",
          type: "initial",
        }}
      />
      <ToolboxItem
        type="Uniswap:Add Liquidity"
        ports={{
          port1: {
            id: "port1",
            type: "top",
            properties: {
              custom: "property",
            },
          },
          port2: {
            id: "port2",
            type: "top",
            properties: {
              custom: "property",
            },
          },
        }}
        properties={{
          name: "Uniswap:Add Liquidity",
          type: "initial",
        }}
      />
      <ToolboxItem
        type="End"
        ports={{
          port1: {
            id: "port1",
            type: "top",
            properties: {
              custom: "property",
            },
          },
        }}
        properties={{
          name: "End",
          type: "initial",
        }}
      />
    </div>
  );
}

export default ChartTopBar;
