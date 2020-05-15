import { cloneDeep } from "lodash";
import { IChart, INode, ILink } from "@mrblenny/react-flow-chart";

/*
 Will return a linear list of signed transactions. 
 */

export const buildTransaction = async (chart: IChart) => {
    let chartCopy = cloneDeep(chart);

    let tx = [];
    let queue = [];

    const initialNode = Object.values(chartCopy.nodes).filter((v: INode) => v.properties && v.properties.type && v.properties.type === "initial");

    if (initialNode.length > 1) {
        return Promise.reject("Only a single initial flash loan is allowed");
    }

    queue.unshift(initialNode.pop());
    // console.log(cloneDeep(queue))

    let i = 0;
    while (queue.length > 0 && i++ < 20) {
        let node = queue.pop() as INode;
        // console.log(cloneDeep(node), cloneDeep(queue))

        if (node.properties && node.properties.codegen) {
            try {
                tx.push(node.properties.codegen(node));
            } catch (err) {
                return Promise.reject(err);
            }
        }
        // console.log(cloneDeep(tx))

        const links = Object.values(chartCopy.links).filter((v: ILink) => v.from.nodeId === node.id && v.to.nodeId).map((v: ILink) => v.to.nodeId as string);
        // console.log(cloneDeep(links))
        links.map((node: string) => Object.values(chartCopy.nodes).filter((n : INode) => n.id === node).pop() as INode).forEach((w: INode) => queue.unshift(w));
        // console.log(cloneDeep(queue))
    }

    if (queue.length > 0) {
        return Promise.reject("Graph too large.");
    }
    // console.log(cloneDeep(tx))

    return tx;
};
