// import { Web3Provider, JsonRpcSigner } from "ethers/providers";
// import { Contract } from "ethers";
// import { isAddress } from "web3-utils";
// import { AddressZero } from "ethers/constants";
// import { ERC20_ABI } from "../constants";
// import { parseBytes32String } from "ethers/utils";
// import { useMemo } from "react";
// import { Token, TokenAmount, Pair } from '@uniswap/sdk'
// import useSWR from 'swr'
// import { abi as IUniswapV2PairABI } from '@uniswap/v2-core/build/IUniswapV2Pair.json'

// import { SWRKeys, useKeepSWRDataLiveAsBlocksArrive } from '.'
// import { useContract } from '../hooks'

// export function getContract(
//   address: string,
//   ABI: any,
//   library: Web3Provider
// ): Contract {
//   return new Contract(address, ABI, library);
// }

// // get token name
// export async function getTokenName(
//   tokenAddress: string,
//   library: Web3Provider
// ) {
//   if (!isAddress(tokenAddress)) {
//     throw Error(`Invalid 'tokenAddress' parameter '${tokenAddress}'.`);
//   }

//   return getContract(tokenAddress, ERC20_ABI, library).name();
// }

// // get token symbol
// export async function getTokenSymbol(
//   tokenAddress: string,
//   library: Web3Provider
// ) {
//   if (!isAddress(tokenAddress)) {
//     throw Error(`Invalid 'tokenAddress' parameter '${tokenAddress}'.`);
//   }

//   return getContract(tokenAddress, ERC20_ABI, library).symbol();
// }

// // get token decimals
// export async function getTokenDecimals(
//   tokenAddress: string,
//   library: Web3Provider
// ) {
//   if (!isAddress(tokenAddress)) {
//     throw Error(`Invalid 'tokenAddress' parameter '${tokenAddress}'.`);
//   }

//   return getContract(tokenAddress, ERC20_ABI, library).decimals();
// }

// // returns null on errors
// export function useContract(address: string, ABI: any, library: any) {

//     return useMemo(() => {
//       try {
//         return getContract(address, ABI, library)
//       } catch {
//         return null
//       }
//     }, [address, ABI, library])
//   }

// function getReserves(contract: Contract | null, tokenA?: Token, tokenB?: Token): () => Promise<Pair | null> {
//   return async (): Promise<Pair | null> =>
//     contract?.getReserves()
//       .then(
//         ({ reserve0, reserve1 }: { reserve0: { toString: () => string }; reserve1: { toString: () => string } }) => {
//           const [token0, token1] = tokenA?.sortsBefore(tokenB) ? [tokenA, tokenB] : [tokenB, tokenA]
//           return new Pair(new TokenAmount(token0, reserve0.toString()), new TokenAmount(token1, reserve1.toString()))
//         }
//       )
//       .catch(() => {
//         return null
//       })
// }

// /*
//  * if loading, return undefined
//  * if no pair created yet, return null
//  * if pair already created (even if 0 reserves), return pair
//  */
// export function usePair(tokenA?: Token, tokenB?: Token): undefined | Pair | null {
//   const pairAddress = !!tokenA && !!tokenB && !tokenA.equals(tokenB) ? Pair.getAddress(tokenA, tokenB) : undefined
//   const contract = useContract(pairAddress + "", IUniswapV2PairABI, false)

//   const shouldFetch = !!contract
//   const key = shouldFetch ? [pairAddress, tokenA?.chainId, SWRKeys.Reserves] : null
//   const { data, mutate } = useSWR(key, getReserves(contract, tokenA, tokenB))
//   useKeepSWRDataLiveAsBlocksArrive(mutate)

//   return data
// }

export const nice = () => {};
