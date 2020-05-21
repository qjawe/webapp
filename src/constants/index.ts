import { ChainId, Token, WETH, JSBI, Percent } from '@uniswap/sdk'
import UNISWAP from "./uniswap/abi/IUniswapV2Router01.json";
import FLASHLOAN from "./artifacts/FlashloanExecutor.json";
import ERC20 from "./abis/erc20.json";
import ERC20_BYTES32 from "./abis/erc20_bytes32.json"
import {
  KOVAN_UNI_TOKEN_LIST,
  KOVAN_TOKEN_LIST,
  UNISWAP_ADDRESS,
} from "./Addresses";

export const UNISWAP_ABI: string = JSON.stringify(UNISWAP);
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

export const NetworkContextName = 'NETWORK'

// default allowed slippage, in bips
export const INITIAL_ALLOWED_SLIPPAGE = 50
// 20 minutes, denominated in seconds
export const DEFAULT_DEADLINE_FROM_NOW = 60 * 20

// one basis point
export const ONE_BIPS = new Percent(JSBI.BigInt(1), JSBI.BigInt(10000))
export const BIPS_BASE = JSBI.BigInt(10000)
// used for warning states
export const ALLOWED_PRICE_IMPACT_LOW: Percent = new Percent(JSBI.BigInt(100), BIPS_BASE) // 1%
export const ALLOWED_PRICE_IMPACT_MEDIUM: Percent = new Percent(JSBI.BigInt(500), BIPS_BASE) // 5%
export const ALLOWED_PRICE_IMPACT_HIGH: Percent = new Percent(JSBI.BigInt(1000), BIPS_BASE) // 10%

// if the price slippage exceeds this number, force the user to type 'confirm' to execute
export const PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN: Percent = new Percent(JSBI.BigInt(2500), BIPS_BASE) // 25%

// used to ensure the user doesn't send so much ETH so they end up with <.01
export const MIN_ETH: JSBI = JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(16)) // .01 ETH
export const V1_TRADE_LINK_THRESHOLD = new Percent(JSBI.BigInt(50), JSBI.BigInt(10000))
