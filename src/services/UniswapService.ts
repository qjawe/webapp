import {
  ChainId,
  JSBI,
  Pair,
  Token,
  TokenAmount,
  WETH,
  Trade,
} from "@uniswap/sdk";
import {
  getTokenDecimals,
  getTokenSymbol,
  getTokenName,
  usePair,
} from "../utils/UniswapUtils";
import { parseUnits } from "ethers/utils";
import { useMemo } from "react";

const DAI = new Token(
  ChainId.MAINNET,
  "0x6B175474E89094C44Da98b954EedeAC495271d0F",
  18,
  "DAI",
  "Dai Stablecoin"
);
const USDC = new Token(
  ChainId.MAINNET,
  "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  6,
  "USDC",
  "USD//C"
);

enum Field {
  INPUT = "INPUT",
  OUTPUT = "OUTPUT",
}

export interface SerializedToken {
  chainId: number;
  address: string;
  decimals: number;
  symbol: string;
  name: string;
}

const deserializeToken = (serializedToken: SerializedToken): Token => {
  return new Token(
    serializedToken.chainId,
    serializedToken.address,
    serializedToken.decimals,
    serializedToken.symbol,
    serializedToken.name
  );
};

const getDeSerializeToken = async (
  tokenAddress: string,
  library: any,
  chainId: any
) => {
  // if (tokenAddress !== "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE") {
  const [decimals, symbol, name] = await Promise.all([
    getTokenDecimals(tokenAddress, library).catch((e) => {
      console.log(e);
      return null;
    }),
    getTokenSymbol(tokenAddress, library).catch((e) => {
      console.log(e);
      return "UNKNOWN";
    }),
    getTokenName(tokenAddress, library).catch((e) => {
      console.log(e);
      return "Unknown";
    }),
  ]);

  return deserializeToken({
    chainId,
    address: tokenAddress,
    decimals,
    symbol,
    name,
  });
};

const tryParseAmount = (
  value?: string,
  token?: Token
): TokenAmount | undefined => {
  if (!value || !token) return;
  try {
    const typedValueParsed = parseUnits(value, token.decimals).toString();
    if (typedValueParsed !== "0")
      return new TokenAmount(token, JSBI.BigInt(typedValueParsed));
  } catch (error) {
    // should fail if the user specifies too many decimal places of precision (or maybe exceed max uint?)
    console.debug(`Failed to parse input amount: "${value}"`, error);
  }
};

async function useAllCommonPairs(
  tokenA: Token,
  tokenB: Token,
  library: any,
  chainId: any
) {
  // check for direct pair between tokens
  const pairBetween = await usePair(tokenA, tokenB, library);

  // get token<->WETH pairs
  const aToETH = await usePair(tokenA, WETH[chainId as ChainId], library);
  const bToETH = await usePair(tokenB, WETH[chainId as ChainId], library);

  // get token<->DAI pairs
  const aToDAI = await usePair(
    tokenA,
    chainId === ChainId.MAINNET ? DAI : undefined,
    library
  );
  const bToDAI = await usePair(
    tokenB,
    chainId === ChainId.MAINNET ? DAI : undefined,
    library
  );

  // get token<->USDC pairs
  const aToUSDC = await usePair(
    tokenA,
    chainId === ChainId.MAINNET ? USDC : undefined,
    library
  );
  const bToUSDC = await usePair(
    tokenB,
    chainId === ChainId.MAINNET ? USDC : undefined,
    library
  );

  // get connecting pairs
  const DAIToETH = await usePair(
    chainId === ChainId.MAINNET ? DAI : undefined,
    WETH[chainId as ChainId],
    library
  );
  const USDCToETH = await usePair(
    chainId === ChainId.MAINNET ? USDC : undefined,
    WETH[chainId as ChainId],
    library
  );
  const DAIToUSDC = await usePair(
    chainId === ChainId.MAINNET ? DAI : undefined,
    chainId === ChainId.MAINNET ? USDC : undefined,
    library
  );

  // only pass along valid pairs, non-duplicated pairs
  const pairs = [
    pairBetween,
    aToETH,
    bToETH,
    aToDAI,
    bToDAI,
    aToUSDC,
    bToUSDC,
    DAIToETH,
    USDCToETH,
    DAIToUSDC,
  ]
    // filter out invalid pairs
    .filter((p): p is Pair => !!p)
    // filter out duplicated pairs
    .filter(
      (p, i, pairs) =>
        i ===
        pairs.findIndex(
          (pair) => pair?.liquidityToken.address === p.liquidityToken.address
        )
    );
  return pairs;
}

/**
 * Returns the best trade for the exact amount of tokens in to the given token out
 */
const useTradeExactIn = async (
  amountIn?: TokenAmount,
  tokenOut?: Token,
  library?: any
) => {
  const inputToken = amountIn?.token;
  const outputToken = tokenOut;

  const allowedPairs = await useAllCommonPairs(
    inputToken,
    outputToken,
    library,
    ChainId.KOVAN
  );
  if (amountIn && tokenOut && allowedPairs.length > 0) {
    return Trade.bestTradeExactIn(allowedPairs, amountIn, tokenOut)[0] ?? null;
  }
  return null;
};

/**
 * Returns the best trade for the token in to the exact amount of token out
 */
const useTradeExactOut = async (
  tokenIn?: Token,
  amountOut?: TokenAmount,
  library?: any
) => {
  const inputToken = tokenIn;
  const outputToken = amountOut?.token;

  const allowedPairs = await useAllCommonPairs(
    inputToken,
    outputToken,
    library,
    ChainId.KOVAN
  );

  if (tokenIn && amountOut && allowedPairs.length > 0) {
    return Trade.bestTradeExactOut(allowedPairs, tokenIn, amountOut)[0] ?? null;
  }
  return null;
};

// from the current swap inputs, compute the best trade and return it.
export const useDerivedSwapInfo = async (
  typedValue: any,
  tokenInAddress: any,
  tokenOutAddress: any,
  library: any,
  isExactIn: boolean
) => {
  const chainId = ChainId.KOVAN;
  const tokenIn = await getDeSerializeToken(tokenInAddress, library, chainId);
  const tokenOut = await getDeSerializeToken(tokenOutAddress, library, chainId);

  const amount = tryParseAmount(typedValue, isExactIn ? tokenIn : tokenOut);
  const bestTradeExactIn = await useTradeExactIn(
    isExactIn ? amount : null,
    tokenOut,
    library
  );
  const bestTradeExactOut = await useTradeExactOut(
    tokenIn,
    !isExactIn ? amount : null,
    library
  );

  const bestTrade = isExactIn ? bestTradeExactIn : bestTradeExactOut;

  const parsedAmounts = {
    [Field.INPUT]: isExactIn ? amount : bestTrade?.inputAmount,
    [Field.OUTPUT]: isExactIn ? bestTrade?.outputAmount : amount,
  };

  return {
    parsedAmounts,
    bestTrade,
  };
};
