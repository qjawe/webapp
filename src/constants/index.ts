import UNISWAP from "./uniswap/abi/IUniswapV2Router01.json";
import FLASHLOAN from "./artifacts/FlashloanExecutor.json";
import ERC20 from "./artifacts/ERC20.json";
import {KOVAN_TOKEN_LIST, UNISWAP_ADDRESS} from "./Addresses";

export const UNISWAP_ABI: string = JSON.stringify(UNISWAP);
export const FLASHLOAN_ABI: any = FLASHLOAN;
export const ERC20_ABI: any = ERC20;
export const TOKEN_LIST: any = KOVAN_TOKEN_LIST;
export {UNISWAP_ADDRESS};
