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

    while (queue.length > 0) {
        let node = queue.pop();

        if (node.properties && node.properties.codegen) {
            tx.push(node.properties.codegen(node));
        }

        const links = Object.values(chartCopy.links).filter((v: ILink) => v.from.nodeId === node.id);
        links.forEach((w: ILink) => queue.unshift(w));
    }

    console.log("bla");
    return 0;
};
