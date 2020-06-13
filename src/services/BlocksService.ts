import { INode } from "@mrblenny/react-flow-chart";
import {
  UNISWAP_ADDRESS,
  UNISWAP_ABI,
  KYBER_NETWORK_PROXY_ABI,
  KYBER_NETWORK_PROXY_ADDRESS
} from "../constants";
import { ethers } from "ethers";
import { BigNumber } from "ethers/utils";
import { TOKEN_LIST } from "../constants";
import { UniswapService, KyberService, Web3Service } from ".";

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
  typeService?: string;
  nodeType?: string;
  amount?: string;
  amountIn?: BigNumber;
  amountOutMin?: BigNumber;
  path?: string[];
  tokenA?: any;
  tokenB?: any;
  liquidity?: number;
  amountADesired?: number;
  amountBDesired?: number;
  amountAMin?: number;
  amountBMin?: number;
  to?: string;
  deadline?: number;
  executionPrice?: any;
  priceImpact?: string;
  price?: string;
  isExactIn?: boolean;
  codegen?: (_: INode) => ITransaction | Promise<ITransaction>;
}

export const Aave = (): IBlock => {
  return {
    name: "Aave:Flash Loan",
    type: "initial",
    typeService: "Aave",
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
    typeService: "End"
    /* codegen: null, // No need */
  };
};

export const Uniswap = (): IBlock => {
  return {
    name: "Uniswap:Swap",
    type: "exchange",
    typeService: "Uniswap",
    nodeType: "swap",
    amount: "1",
    amountOutMin: ethers.utils.parseUnits("91.9013", "ether"),
    to: "0x038AD9777dC231274553ff927CcB0Fd21Cd42fb9",
    deadline: 1590969600,
    tokenA: "0xd0A1E359811322d97991E03f863a0C30C2cF029C",
    tokenB: "0xFf795577d9AC8bD7D90Ee22b6C1703490b6512FD",
    executionPrice: "91.9013",
    priceImpact: "28.4032",
    price: "91.9013  DAI per ETH",
    isExactIn: true,
    codegen: async (node: INode): Promise<ITransaction> => {
      console.log("Enter block service", node.properties.to);
      console.log(
        node.properties.amount,
        node.properties.tokenA,
        node.properties.tokenB,
        node.properties.isExactIn
      );
      const trade = await Web3Service.getUniswapPriceValues(
        node.properties.amount,
        node.properties.tokenA,
        node.properties.tokenB,
        node.properties.isExactIn
      );
      console.log(trade);
      const txData = UniswapService.useUniswap(
        trade.bestTrade,
        node.properties.to
      );
      const txTo = UNISWAP_ADDRESS;
      return { to: txTo, input: txData, value: "0", callType: "0" };
    }
  };
};

export const Kyberswap = (): IBlock => {
  return {
    name: "Kyber:Swap",
    type: "exchange",
    typeService: "Kyber",
    nodeType: "swap",
    tokenA: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
    tokenB: "0xd26114cd6EE289AccF82350c8d8487fedB8A0C07",
    amount: "0",
    codegen: (node: INode): ITransaction => {
      const txData = KyberService.useKyberswap(
        node.properties.tokenA,
        node.properties.tokenB,
        node.properties.amount
      );
      const txTo = KYBER_NETWORK_PROXY_ADDRESS;
      return { to: txTo, input: txData, value: "0", callType: "0" };
    }
  };
};

export const UniswapAddLiquidity = (): IBlock => {
  return {
    name: "Uniswap:AddLiquidity",
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
          node.properties.deadline
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
          node.properties.deadline
        ]);
      }
      const txTo = UNISWAP_ADDRESS;
      return { to: txTo, input: txData, value: "0", callType: "0" };
    }
  };
};

export const UniswapRemoveLiquidity = (): IBlock => {
  return {
    name: "Uniswap:RemoveLiquidity",
    type: "exchange",
    nodeType: "removeLiquidity",
    tokenA: TOKEN_LIST[0],
    tokenB: TOKEN_LIST[1],
    liquidity: 0,
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
        txData = uniswap.functions.removeLiquidityEth.encode([
          node.properties.tokenA.symbol === "ETH"
            ? node.properties.tokenB.address
            : node.properties.tokenA.address,
          node.properties.liquidity,
          node.properties.tokenA.symbol === "ETH"
            ? node.properties.amountBMin
            : node.properties.amountAMin,
          node.properties.tokenA.symbol === "ETH"
            ? node.properties.amountAMin
            : node.properties.amountBMin,
          node.properties.to,
          node.properties.deadline
        ]);
      } else {
        txData = uniswap.functions.removeLiquidity.encode([
          node.properties.tokenA.address,
          node.properties.tokenB.address,
          node.properties.liquidity,
          node.properties.amountAMin,
          node.properties.amountBMin,
          node.properties.to,
          node.properties.deadline
        ]);
      }
      const txTo = UNISWAP_ADDRESS;
      return { to: txTo, input: txData, value: "0", callType: "0" };
    }
  };
};
