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
          ...aave,
          name: "Aave:Flash Loan",
          type: "initial",
          nodeType: "flashLoan",
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
          ...uniswap,
          name: "Uniswap:Swap",
          nodeType: "swap",
          amountIn: ethers.utils.parseUnits("10", "ether"),
          amountOutMin: ethers.utils.parseUnits("9.9", "ether"),
          path: [
            "0xff795577d9ac8bd7d90ee22b6c1703490b6512fd",
            "0xaaf64bfcc32d0f15873a02163e7e500671a4ffcd",
          ],
          to: "0x038AD9777dC231274553ff927CcB0Fd21Cd42fb9",
          deadline: 1590969600,
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
          ...uniswapAddLiquidity,
          tokenA: TOKEN_LIST[0],
          tokenB: TOKEN_LIST[1],
          amountADesired: 0,
          amountBDesired: 0,
          amountAMin: 0,
          amountBMin: 0,
          to: "0x038AD9777dC231274553ff927CcB0Fd21Cd42fb9",
          deadline: 1590969600,
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
          ...end,
        }}
      />
    </div>
  );
}

export default ChartTopBar;
