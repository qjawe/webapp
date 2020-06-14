import { cloneDeep } from "lodash";
import { IChart, INode, ILink } from "@mrblenny/react-flow-chart";
import { findInitialNodes } from "../utils/ChartUtils";
import { Simulation, Profit } from "../entities";

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

    const links = Object.values(chartCopy.links)
      .filter((v: ILink) => v.from.nodeId === node.id && v.to.nodeId)
      .map((v: ILink) => v.to.nodeId as string);
    links
      .map(
        (node: string) =>
          Object.values(chartCopy.nodes)
            .filter((n: INode) => n.id === node)
            .pop() as INode
      )
      .forEach((w: INode) => queue.unshift(w));
  }

  if (queue.length > 0) {
    return Promise.reject("Graph too large.");
  }

  return tx;
};

export const showSimulation = (
  chart: IChart
): Promise<{ simulations: Simulation[]; totalTokensProfit: Profit[] }> => {
  let chartCopy = cloneDeep(chart);

  let simulations: Simulation[] = [];
  let totalTokensProfit: Profit[] = [];
  let queue = [];

  const initialNode = findInitialNodes(chartCopy);

  if (initialNode.length > 1) {
    return Promise.reject("Only a single initial flash loan is allowed");
  }

  queue.unshift(initialNode.pop());

  let i = 0;
  while (queue.length > 0 && i++ < 20) {
    let node = queue.pop() as INode;

    if (node.ports && node.properties) {
      try {
        Object.keys(node.ports).forEach(port => {
          if (node.ports[port] && node.ports[port].type === "input") {
            if (node.ports[port].properties.amount) {
              const simulation : Simulation = {
                name: node.properties.name,
                amount: node.ports[port].properties.amount,
                token: node.ports[port].properties.asset,
                message: "You spend",
                type: "spend"
              };
              simulations.push(simulation);

              if (totalTokensProfit.length) {
                let hasTokenCheck = false;
                let selectedToken = 0;
                totalTokensProfit.forEach((details, i) => {
                  if (
                    details.token.address ===
                    node.ports[port].properties.asset.tokenAddress
                  ) {
                    hasTokenCheck = true;
                    selectedToken = i;
                  }
                });
                if (hasTokenCheck) {
                  totalTokensProfit[selectedToken].amount -= Number.parseFloat(
                    node.ports[port].properties.amount
                  );
                } else {
                  const tokenDetail = {
                    amount: -Number.parseFloat(
                      node.ports[port].properties.amount
                    ),
                    token: node.ports[port].properties.asset
                  };
                  totalTokensProfit.push(tokenDetail);
                }
              } else {
                const tokenDetail = {
                  amount: -Number.parseFloat(
                    node.ports[port].properties.amount
                  ),
                  token: node.ports[port].properties.asset
                };
                totalTokensProfit.push(tokenDetail);
              }
            }
          }
          if (node.ports[port] && node.ports[port].type === "output") {
            if (node.ports[port].properties.amount) {
              const simulation : Simulation = {
                name: node.properties.name,
                amount: node.ports[port].properties.amount,
                token: node.ports[port].properties.asset,
                message: "You get",
                type: "get"
              };
              simulations.push(simulation);
              if (totalTokensProfit.length) {
                let hasTokenCheck = false;
                let selectedToken = 0;
                totalTokensProfit.forEach((details, i) => {
                  if (
                    details.token.address ===
                    node.ports[port].properties.asset.tokenAddress
                  ) {
                    hasTokenCheck = true;
                    selectedToken = i;
                  }
                });
                if (hasTokenCheck) {
                  totalTokensProfit[selectedToken].amount += Number.parseFloat(
                    node.ports[port].properties.amount
                  );
                } else {
                  const tokenDetail = {
                    amount: +Number.parseFloat(
                      node.ports[port].properties.amount
                    ),
                    token: node.ports[port].properties.asset
                  };
                  totalTokensProfit.push(tokenDetail);
                }
              } else {
                const tokenDetail = {
                  amount: +Number.parseFloat(
                    node.ports[port].properties.amount
                  ),
                  token: node.ports[port].properties.asset
                };
                totalTokensProfit.push(tokenDetail);
              }
            }
          }
        });
      } catch (err) {
        return Promise.reject(err);
      }
    }

    const links = Object.values(chartCopy.links)
      .filter((v: ILink) => v.from.nodeId === node.id && v.to.nodeId)
      .map((v: ILink) => v.to.nodeId as string);
    links
      .map(
        (node: string) =>
          Object.values(chartCopy.nodes)
            .filter((n: INode) => n.id === node)
            .pop() as INode
      )
      .forEach((w: INode) => queue.unshift(w));
  }

  if (queue.length > 0) {
    return Promise.reject("Graph too large.");
  }
  return Promise.resolve({ simulations, totalTokensProfit });
};
