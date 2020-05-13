import UNISWAP from "./abis/IUniswapV2Router01.json";
import EXECUTOR from "./abis/FlashloanExecutor.json";

export const UNISWAP_ADDRESS: string = "0xcDbE04934d89e97a24BCc07c3562DC8CF17d8167";
export const UNISWAP_ABI: string = JSON.stringify(UNISWAP);

export const EXECUTOR_ADDRESS: string = "0x94a808A11FdC9D90413B4F97242411716AEE71De";
export const EXECUTOR_ABI: string = JSON.stringify(EXECUTOR.abi);

export const AAVE_ETHEREUM: string = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
export const AAVE_PROVIDER: string = "0x506B0B2CF20FAA8f38a4E2B524EE43e1f4458Cc5";
