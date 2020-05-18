// import {
//   ChainId,
//   JSBI,
//   Pair,
//   Token,
//   TokenAmount,
//   WETH,
//   Trade,
// } from "@uniswap/sdk";
// import {
//   getTokenDecimals,
//   getTokenSymbol,
//   getTokenName,
//   usePair,
// } from "../utils/UniswapUtils";
// import { parseUnits } from "ethers/utils";
// import { useMemo } from "react";

// const DAI = new Token(ChainId.MAINNET, '0x6B175474E89094C44Da98b954EedeAC495271d0F', 18, 'DAI', 'Dai Stablecoin')
// const USDC = new Token(ChainId.MAINNET, '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', 6, 'USDC', 'USD//C')

// export interface SerializedToken {
//   chainId: number;
//   address: string;
//   decimals: number;
//   symbol: string;
//   name: string;
// }

// const deserializeToken = (serializedToken: SerializedToken): Token => {
//   return new Token(
//     serializedToken.chainId,
//     serializedToken.address,
//     serializedToken.decimals,
//     serializedToken.symbol,
//     serializedToken.name
//   );
// };

// const getDeSerializeToken = async (tokenAddress: string, library: any) => {
//   const [decimals, symbol, name] = await Promise.all([
//     getTokenDecimals(tokenAddress, library).catch(() => null),
//     getTokenSymbol(tokenAddress, library).catch(() => "UNKNOWN"),
//     getTokenName(tokenAddress, library).catch(() => "Unknown"),
//   ]);
//   return deserializeToken({
//     chainId: 42,
//     address: tokenAddress,
//     decimals,
//     symbol,
//     name,
//   });
// };

// const tryParseAmount = (
//   value?: string,
//   token?: Token
// ): TokenAmount | undefined => {
//   if (!value || !token) return;
//   try {
//     const typedValueParsed = parseUnits(value, token.decimals).toString();
//     if (typedValueParsed !== "0")
//       return new TokenAmount(token, JSBI.BigInt(typedValueParsed));
//   } catch (error) {
//     // should fail if the user specifies too many decimal places of precision (or maybe exceed max uint?)
//     console.debug(`Failed to parse input amount: "${value}"`, error);
//   }
// };

// function useAllCommonPairs(tokenA: Token, tokenB: Token): Pair[] {
//   const chainId = 1;

//   // check for direct pair between tokens
//   const pairBetween = usePair(tokenA, tokenB)

//   // get token<->WETH pairs
//   const aToETH = usePair(tokenA, WETH[chainId])
//   const bToETH = usePair(tokenB, WETH[chainId])

//   // only pass along valid pairs, non-duplicated pairs
//   return useMemo(
//     () =>
//       [pairBetween, aToETH, bToETH?],
//     [pairBetween, aToETH, bToETH?]
//   )
// }

// /**
//  * Returns the best trade for the exact amount of tokens in to the given token out
//  */
// const useTradeExactIn = (amountIn?: TokenAmount, tokenOut?: Token): Trade | null => {
//     const inputToken = amountIn?.token
//     const outputToken = tokenOut

//     const allowedPairs = useAllCommonPairs(inputToken, outputToken)

//     return useMemo(() => {
//       if (amountIn && tokenOut && allowedPairs.length > 0) {
//         return Trade.bestTradeExactIn(allowedPairs, amountIn, tokenOut)[0] ?? null
//       }
//       return null
//     }, [allowedPairs, amountIn, tokenOut])
//   }

//   /**
//    * Returns the best trade for the token in to the exact amount of token out
//    */
// const useTradeExactOut = (tokenIn?: Token, amountOut?: TokenAmount): Trade | null => {
//     const inputToken = tokenIn
//     const outputToken = amountOut?.token

//     const allowedPairs = useAllCommonPairs(inputToken, outputToken)

//     return useMemo(() => {
//       if (tokenIn && amountOut && allowedPairs.length > 0) {
//         return Trade.bestTradeExactOut(allowedPairs, tokenIn, amountOut)[0] ?? null
//       }
//       return null
//     }, [allowedPairs, tokenIn, amountOut])
//   }

// // from the current swap inputs, compute the best trade and return it.
// export const useDerivedSwapInfo = async (
//   typedValue: any,
//   tokenInAddress: any,
//   tokenOutAddress: any,
//   library: any,
//   isExactIn: boolean
// ) => {
//   const tokenIn = await getDeSerializeToken(tokenInAddress, library);
//   const tokenOut = await getDeSerializeToken(tokenOutAddress, library);

//   const amount = tryParseAmount(typedValue, isExactIn ? tokenIn : tokenOut);

//   const bestTradeExactIn = useTradeExactIn(isExactIn ? amount : null, tokenOut);
//   const bestTradeExactOut = useTradeExactOut(
//     tokenIn,
//     !isExactIn ? amount : null
//   );

//   const bestTrade = isExactIn ? bestTradeExactIn : bestTradeExactOut;

//   const parsedAmounts = {
//     [Field.INPUT]: isExactIn ? amount : bestTrade?.inputAmount,
//     [Field.OUTPUT]: isExactIn ? bestTrade?.outputAmount : amount,
//   };

//   const tokenBalances = {
//     [Field.INPUT]: relevantTokenBalances?.[tokenIn?.address],
//     [Field.OUTPUT]: relevantTokenBalances?.[tokenOut?.address],
//   };

//   const tokens = {
//     [Field.INPUT]: tokenIn,
//     [Field.OUTPUT]: tokenOut,
//   };

//   // get link to trade on v1, if a better rate exists
//   const v1TradeLinkIfBetter = useV1TradeLinkIfBetter(
//     isExactIn,
//     tokens[Field.INPUT],
//     tokens[Field.OUTPUT],
//     isExactIn ? parsedAmounts[Field.INPUT] : parsedAmounts[Field.OUTPUT],
//     bestTrade,
//     V1_TRADE_LINK_THRESHOLD
//   );

//   let error: string | undefined;
//   if (!account) {
//     error = "Connect Wallet";
//   }

//   if (!parsedAmounts[Field.INPUT]) {
//     error = error ?? "Enter an amount";
//   }

//   if (!parsedAmounts[Field.OUTPUT]) {
//     error = error ?? "Enter an amount";
//   }

//   if (
//     tokenBalances[Field.INPUT] &&
//     parsedAmounts[Field.INPUT] &&
//     tokenBalances[Field.INPUT].lessThan(parsedAmounts[Field.INPUT])
//   ) {
//     error = "Insufficient " + tokens[Field.INPUT]?.symbol + " balance";
//   }

//   return {
//     tokens,
//     tokenBalances,
//     parsedAmounts,
//     bestTrade,
//     error,
//     v1TradeLinkIfBetter,
//   };
// };

export const nice = () => {};
