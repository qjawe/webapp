import { INode } from "@mrblenny/react-flow-chart";
import { UNISWAP_ADDRESS, UNISWAP_ABI } from "../constants";
import { ethers } from "ethers";
import { BigNumber } from "ethers/utils";
import { TOKEN_LIST } from "../constants";

/*
 An export for each type of block.
 */

export interface ITransaction {
  to: string;
  input: string;
  value: string;
  callType: string;
}

export interface IBlock {
  name: string;
  type: string;
  nodeType?: string;
  amountIn?: BigNumber;
  amountOutMin?: BigNumber;
  path?: string[];
  tokenA?: any;
  tokenB?: any;
  amountADesired?: number;
  amountBDesired?: number;
  amountAMin?: number;
  amountBMin?: number;
  to?: string;
  deadline?: number;
  codegen?: (_: INode) => ITransaction;
}

export const Aave = (): IBlock => {
  return {
    name: "Aave:Flash Loan",
    type: "initial",
    nodeType: "flashLoan"
    /* codegen: null, // Null as the contract has the logic by itself */
  };
};

export const Splitter = (): IBlock => {
  return {
    name: "Splitter",
    type: "splitter",
    nodeType: "splitter"
    /* codegen: null, // No need */
  };
};

export const End = (): IBlock => {
  return {
    name: "End",
    type: "end",
    /* codegen: null, // No need */
  };
};

export const Uniswap = (): IBlock => {
  return {
    name: "Uniswap:Swap",
    type: "exchange",
    nodeType: "swap",
    amountIn: ethers.utils.parseUnits("10", "ether"),
    amountOutMin: ethers.utils.parseUnits("9.9", "ether"),
    path: [
      "0xff795577d9ac8bd7d90ee22b6c1703490b6512fd",
      "0xaaf64bfcc32d0f15873a02163e7e500671a4ffcd",
    ],
    to: "0x038AD9777dC231274553ff927CcB0Fd21Cd42fb9",
    deadline: 1590969600,
    codegen: (node: INode): ITransaction => {
      const uniswap = new ethers.utils.Interface(UNISWAP_ABI);
      const txData = uniswap.functions.swapExactTokensForTokens.encode([
        node.properties.amountIn,
        node.properties.amountOutMin,
        node.properties.path,
        node.properties.to,
        node.properties.deadline,
      ]);
      const txTo = UNISWAP_ADDRESS;
      return { to: txTo, input: txData, value: "0", callType: "0" };
    },
  };
};

export const UniswapAddLiquidity = (): IBlock => {
  return {
    name: "UniswapAddLiquidity",
    type: "exchange",
    nodeType: "addLiquidity",
    tokenA: TOKEN_LIST[0],
    tokenB: TOKEN_LIST[1],
    amountADesired: 0,
    amountBDesired: 0,
    amountAMin: 0,
    amountBMin: 0,
    to: "0x038AD9777dC231274553ff927CcB0Fd21Cd42fb9",
    deadline: 1590969600,
    codegen: (node: INode): ITransaction => {
      const uniswap = new ethers.utils.Interface(UNISWAP_ABI);
      let txData;
      if (
        node.properties.tokenA.symbol === "ETH" ||
        node.properties.tokenB.symbol === "ETH"
      ) {
        txData = uniswap.functions.addLiquidityEth.encode([
          node.properties.tokenA.symbol === "ETH"
            ? node.properties.tokenB.address
            : node.properties.tokenA.address,
          node.properties.tokenA.symbol === "ETH"
            ? node.properties.amountBDesired
            : node.properties.amountADesired,
          node.properties.tokenA.symbol === "ETH"
            ? node.properties.amountBMin
            : node.properties.amountAMin,
          node.properties.tokenA.symbol === "ETH"
            ? node.properties.amountAMin
            : node.properties.amountBMin,
          node.properties.to,
          node.properties.deadline,
        ]);
      } else {
        txData = uniswap.functions.addLiquidity.encode([
          node.properties.tokenA.address,
          node.properties.tokenB.address,
          node.properties.amountADesired,
          node.properties.amountBDesired,
          node.properties.amountAMin,
          node.properties.amountBMin,
          node.properties.to,
          node.properties.deadline,
        ]);
      }
      const txTo = UNISWAP_ADDRESS;
      return { to: txTo, input: txData, value: "0", callType: "0" };
    },
  };
};
