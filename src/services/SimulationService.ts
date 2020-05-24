import { cloneDeep } from "lodash";
import { IChart, INode, ILink } from "@mrblenny/react-flow-chart";
import { findInitialNodes } from "../utils/ChartUtils";
/*
 Will return a linear list of signed transactions. 
 */

export const buildTransaction = async (chart: IChart) => {
    let chartCopy = cloneDeep(chart);

    let tx = [];
    let queue = [];

    const initialNode = findInitialNodes(chartCopy);

    if (initialNode.length > 1) {
        return Promise.reject("Only a single initial flash loan is allowed");
    }

    queue.unshift(initialNode.pop());

    let i = 0;
    while (queue.length > 0 && i++ < 20) {
        let node = queue.pop() as INode;
        
        if (node.properties && node.properties.codegen) {
            try {
                const getCodegen = await node.properties.codegen(node);
                tx.push(getCodegen);
            } catch (err) {
                return Promise.reject(err);
            }
        }

        const links = Object.values(chartCopy.links).filter((v: ILink) => v.from.nodeId === node.id && v.to.nodeId).map((v: ILink) => v.to.nodeId as string);
        links.map((node: string) => Object.values(chartCopy.nodes).filter((n : INode) => n.id === node).pop() as INode).forEach((w: INode) => queue.unshift(w));
    }

    if (queue.length > 0) {
        return Promise.reject("Graph too large.");
    }

    return tx;
};
