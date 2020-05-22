import { ChainId, Token, WETH, JSBI, Percent } from "@uniswap/sdk";
import UNISWAP from "./uniswap/abis/IUniswapV2Router01.json";
import KYBER_NETWORK_PROXY from "./kyber/abis/kyberNetworkProxy.json"
import FLASHLOAN from "./artifacts/FlashloanExecutor.json";
import ERC20 from "./abis/erc20.json";
import ERC20_BYTES32 from "./abis/erc20_bytes32.json";
import {
  KOVAN_UNI_TOKEN_LIST,
  KOVAN_TOKEN_LIST,
  UNISWAP_ADDRESS,
  KYBER_ADDRESS
} from "./Addresses";

export const UNISWAP_ABI: string = JSON.stringify(UNISWAP);
export const KYBER_NETWORK_PROXY_ABI: string = JSON.stringify(KYBER_NETWORK_PROXY)
export const FLASHLOAN_ABI: any = FLASHLOAN.abi;
export const ERC20_ABI: any = ERC20;
export const ERC20_BYTES32_ABI: any = ERC20_BYTES32;

export const TOKEN_LIST: any = KOVAN_TOKEN_LIST;
export const UNI_TOKEN_LIST: any = KOVAN_UNI_TOKEN_LIST;

export const FLASHLOAN_ADDRESS: string =
  "0x703Bf8546C76c23afE057AD52eB1804F4c4f88ca";
export const AAVE_ETHEREUM: string =
  "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
export const AAVE_PROVIDER: string =
  "0x506B0B2CF20FAA8f38a4E2B524EE43e1f4458Cc5";

export { UNISWAP_ADDRESS };
export const KYBER_NETWORK_PROXY_ADDRESS = KYBER_ADDRESS.KOVAN;