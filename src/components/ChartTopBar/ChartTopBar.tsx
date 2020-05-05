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
        properties={aave}
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
        properties={uniswap}
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
