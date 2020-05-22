import { IChart, INode } from "@mrblenny/react-flow-chart";

export function findInitialNodes(chart : IChart) : INode[] {
    return Object.values(chart.nodes).filter((v: INode) => v.properties && v.properties.type && v.properties.type === "initial");

}