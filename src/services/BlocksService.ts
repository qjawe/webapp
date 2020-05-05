import { INode } from "@mrblenny/react-flow-chart";
import { UNISWAP_ADDRESS, UNISWAP_ABI } from "../constants";
import { ethers } from "ethers";
import { EtherscanProvider } from "ethers/providers";

/*
 An export for each type of block.
 */ 
export interface ITransaction {
    to: string,
    txData: string,
}

 export interface IBlock {
     name: string,
     type: string,
     codegen?: (_: INode) => (ITransaction);
 }

 export const Aave = () : IBlock => {
     return {
         name: "Aave",
         type: "flash-loan",
         /* codegen: null, // Null as the contract has the logic by itself */
     }
 }

export const Uniswap = () : IBlock => {
    return {
        name: "Uniswap",
        type: "exhange",
        codegen: (node: INode) : ITransaction => {
            const uniswap = new ethers.utils.Interface(UNISWAP_ABI);
            const txData = uniswap.functions.swapExactTokensForTokens.encode([
                node.properties.amountIn,
                node.properties.amountOutMin,
                node.properties.path,
                node.properties.to,
                node.properties.deadline]);
            const txTo = UNISWAP_ADDRESS;
            return { to: txTo, txData: txData };
        }
    }
}