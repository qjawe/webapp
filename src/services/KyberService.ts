import {
  KYBER_NETWORK_PROXY_ABI,
  KYBER_NETWORK_PROXY_ADDRESS,
  AAVE_ETHEREUM
} from "../constants";

import { ethers } from "ethers";
import { BigNumber } from "ethers/utils";
enum SwapType {
  SWAP_ETHER_TO_TOKEN,
  SWAP_TOKEN_TO_ETHER,
  SWAP_TOKEN_TO_TOKEN
}

const wethAddress: string = AAVE_ETHEREUM;

function getSwapType(
  SRC_TOKEN_ADDRESS: string,
  DST_TOKEN_ADDRESS: string
): SwapType {
  if (
    SRC_TOKEN_ADDRESS.localeCompare(wethAddress, undefined, {
      sensitivity: "base"
    }) === 0
  ) {
    return SwapType.SWAP_ETHER_TO_TOKEN;
  } else if (
    DST_TOKEN_ADDRESS.localeCompare(wethAddress, undefined, {
      sensitivity: "base"
    }) === 0
  ) {
    return SwapType.SWAP_TOKEN_TO_ETHER;
  } else {
    return SwapType.SWAP_TOKEN_TO_TOKEN;
  }
}

export function useKyberswap(
  SRC_TOKEN_ADDRESS: string, // trade to execute, required
  DST_TOKEN_ADDRESS: string,
  pAmount: any
) {
  const amount: BigNumber = ethers.utils.parseEther(pAmount + "");
  const minConversionRate: BigNumber = ethers.utils.bigNumberify("0");
  const swapType: SwapType = getSwapType(SRC_TOKEN_ADDRESS, DST_TOKEN_ADDRESS);

  const kyber = new ethers.utils.Interface(KYBER_NETWORK_PROXY_ABI);
  let method: string;
  switch (swapType) {
    case SwapType.SWAP_ETHER_TO_TOKEN:
      method = kyber.functions.swapEtherToToken.encode([
        DST_TOKEN_ADDRESS,
        minConversionRate
      ]);
      break;
    case SwapType.SWAP_TOKEN_TO_ETHER:
      method = kyber.functions.swapTokenToEther.encode([
        SRC_TOKEN_ADDRESS,
        amount,
        minConversionRate
      ]);
      break;
    case SwapType.SWAP_TOKEN_TO_TOKEN:
      method = kyber.functions.swapTokenToToken.encode([
        SRC_TOKEN_ADDRESS,
        amount,
        DST_TOKEN_ADDRESS,
        minConversionRate
      ]);
      break;
  }
  return method;
}

export function getRates(SRC_TOKEN_ADDRESS: string, DST_TOKEN_ADDRESS: string, pAmount: any) {
  const SRC_QTY_WEI = ethers.utils.parseEther(pAmount + "");
  const provider = ethers.getDefaultProvider("kovan");
  const kyber = new ethers.Contract(
    KYBER_NETWORK_PROXY_ADDRESS,
    KYBER_NETWORK_PROXY_ABI,
    provider
  );
  return kyber.getExpectedRate(
    SRC_TOKEN_ADDRESS,
    DST_TOKEN_ADDRESS,
    SRC_QTY_WEI
  );
}
