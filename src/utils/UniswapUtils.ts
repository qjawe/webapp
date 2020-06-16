import { Web3Provider } from "ethers/providers";
import { Contract } from "ethers";
import { isAddress } from "web3-utils";
import { ERC20_ABI } from "../constants";
import { Token, TokenAmount, Pair } from "@uniswap/sdk";
import { abi as IUniswapV2PairABI } from "@uniswap/v2-core/build/IUniswapV2Pair.json";

export function getContract(
  address: string,
  ABI: any,
  library: Web3Provider
): Contract {
  return new Contract(address, ABI, library);
}

// get token name
export async function getTokenName(
  tokenAddress: string,
  library: Web3Provider
) {
  if (!isAddress(tokenAddress)) {
    throw Error(`Invalid 'tokenAddress' parameter '${tokenAddress}'.`);
  }
  return getContract(tokenAddress, ERC20_ABI, library).name();
}

// get token symbol
export async function getTokenSymbol(
  tokenAddress: string,
  library: Web3Provider
) {
  if (!isAddress(tokenAddress)) {
    throw Error(`Invalid 'tokenAddress' parameter '${tokenAddress}'.`);
  }

  return getContract(tokenAddress, ERC20_ABI, library).symbol();
}

// get token decimals
export async function getTokenDecimals(
  tokenAddress: string,
  library: Web3Provider
) {
  if (!isAddress(tokenAddress)) {
    throw Error(`Invalid 'tokenAddress' parameter '${tokenAddress}'.`);
  }

  return getContract(tokenAddress, ERC20_ABI, library).decimals();
}

// returns null on errors
export function useContract(address: string, ABI: any, library: any) {
  try {
    return getContract(address, ABI, library);
  } catch {
    return null;
  }
}

function getReserves(
  contract: Contract | null,
  tokenA?: Token,
  tokenB?: Token
): Promise<Pair | null> {
  return contract
    ?.getReserves()
    .then(
      ({
        reserve0,
        reserve1
      }: {
        reserve0: { toString: () => string };
        reserve1: { toString: () => string };
      }) => {
        // @ts-ignore
        const [token0, token1] = tokenA?.sortsBefore(tokenB)
          ? [tokenA, tokenB]
          : [tokenB, tokenA];
        return new Pair(
          // @ts-ignore
          new TokenAmount(token0, reserve0.toString()),
          // @ts-ignore
          new TokenAmount(token1, reserve1.toString())
        );
      }
    )
    .catch(() => {
      return null;
    });
}

export enum SWRKeys {
  Allowances,
  Reserves,
  TotalSupply,
  V1PairAddress
}

/*
 * if loading, return undefined
 * if no pair created yet, return null
 * if pair already created (even if 0 reserves), return pair
 */
export async function usePair(tokenA?: Token, tokenB?: Token, library?: any) {
  const pairAddress =
    !!tokenA && !!tokenB && !tokenA.equals(tokenB)
      ? Pair.getAddress(tokenA, tokenB)
      : undefined;
  // @ts-ignore
  const contract = useContract(pairAddress, IUniswapV2PairABI, library);
  const data = await getReserves(contract, tokenA, tokenB);

  return data;
}
