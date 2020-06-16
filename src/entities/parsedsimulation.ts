import { Token } from "./token";

class SimulationElement {
    amount: number = 0;
    token: Token;
    message: string = "";
    type: string = "";

    constructor(token: Token, amount?: number, message?: string, type?: string) {
        this.token = token;
        if (amount) this.amount = amount;
        if (message) this.message = message;
        if (type) this.type = type;
    }
}

export class ParsedSimulation {
    nodeName: string = "";
    children: SimulationElement[] = [];
}