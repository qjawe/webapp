import JSBI from 'jsbi';

import { ChainId, SolidityType } from "../constants";
import { validateAndParseAddress, validateSolidityTypeInstance } from 'utils';

export class Token {
  public readonly chainId: ChainId;
  public readonly address: string;
  public readonly decimals: number;
  public readonly symbol?: string;
  public readonly name?: string;

  constructor(
    chainId: ChainId,
    address: string,
    decimals: number,
    symbol?: string,
    name?: string
  ) {
    validateSolidityTypeInstance(JSBI.BigInt(decimals), SolidityType.uint8);

    this.chainId = chainId;
    this.address = validateAndParseAddress(address);
    this.decimals = decimals;
    if (typeof symbol === "string") this.symbol = symbol;
    if (typeof name === "string") this.name = name;
  }
}
