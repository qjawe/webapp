import UNISWAP from "./uniswap/abi/IUniswapV2Router01.json";
import FLASHLOAN from "./artifacts/FlashloanExecutor.json";
import ERC20 from "./artifacts/ERC20.json";
import { MAINNET_TOKEN_LIST, UNISWAP_ADDRESS } from "./Addresses";

export const UNISWAP_ABI: string = JSON.stringify(UNISWAP);
export const FLASHLOAN_ABI: any = FLASHLOAN.abi;
export const ERC20_ABI: any = ERC20;

export const TOKEN_LIST: any = MAINNET_TOKEN_LIST;

export const FLASHLOAN_ADDRESS: string = "0x703Bf8546C76c23afE057AD52eB1804F4c4f88ca";
export const AAVE_ETHEREUM: string = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
export const AAVE_PROVIDER: string = "0x506B0B2CF20FAA8f38a4E2B524EE43e1f4458Cc5";

export { UNISWAP_ADDRESS };
