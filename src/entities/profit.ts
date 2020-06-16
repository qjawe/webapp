import { Token } from "./token";

export class Profit {
  amount: number = 0;
  token: Token;

  constructor(token: Token, amount: number) {
    this.token = token;
    this.amount = amount;
  }
}
