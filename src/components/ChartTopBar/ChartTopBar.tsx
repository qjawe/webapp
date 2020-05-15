import React from "react";
import "./ChartTopBar.scss";
import ToolboxItem from "../ToolboxItem";
import {
  Aave,
  Uniswap,
  End,
  UniswapAddLiquidity,
} from "../../services/BlocksService";
import { TOKEN_LIST } from "../../constants";
import { ethers } from "ethers";

function ChartTopBar() {
  const aave = Aave();
  const uniswap = Uniswap();
  const uniswapAddLiquidity = UniswapAddLiquidity();
  const end = End();

  return (
    <div className="chart-top-bar">
      <ToolboxItem
        type="Aave:Flash Loan"
        ports={{
          port1: {
            id: "port1",
            type: "bottom",
            properties: {
              type: "reserve",
              amount: 0,
              asset: TOKEN_LIST[0],
            },
          },
        }}
        properties={{
          ...aave
        }}
      />
      <ToolboxItem
        type="Uniswap:Swap"
        ports={{
          port1: {
            id: "port1",
            type: "top",
            properties: {
              type: "input",
              amount: 0,
              asset: TOKEN_LIST[0],
            },
          },
          port2: {
            id: "port2",
            type: "bottom",
            properties: {
              type: "output",
              amount: 0,
              asset: TOKEN_LIST[0],
            },
          },
        }}
        properties={{
          ...uniswap
        }}
      />
      <ToolboxItem
        type="Uniswap:Add Liquidity"
        ports={{
          port1: {
            id: "port1",
            type: "top",
            properties: {
              type: "input",
              amount: 0,
              asset: TOKEN_LIST[0],
            },
          },
          port2: {
            id: "port2",
            type: "top",
            properties: {
              type: "input",
              amount: 0,
              asset: TOKEN_LIST[1],
            },
          },
        }}
        properties={{
          ...uniswapAddLiquidity
        }}
      />
      <ToolboxItem
        type="End"
        ports={{
          port1: {
            id: "port1",
            type: "top",
            properties: {
              type: "input",
              amount: 0,
              asset: TOKEN_LIST[0],
            },
          },
        }}
        properties={{
          ...end
        }}
      />
    </div>
  );
}

export default ChartTopBar;
