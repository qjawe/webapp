import { IChart } from "@mrblenny/react-flow-chart";
import { Aave, Uniswap, Splitter } from "../services/BlocksService";

const aave = Aave();
const uniswap = Uniswap();
const splitter = Splitter();

export const chartSimple: IChart = {
  offset: {
    x: 0,
    y: 0,
  },
  scale: 1,
  nodes: {
    node1: {
      id: "node1",
      type: "Aave:Flash Loan",
      position: {
        x: 500,
        y: 100,
      },
      ports: {
        port1: {
          id: "port1",
          type: "output",
          properties: {
            amount: 100,
            asset: "ETH",
          },
        },
      },
      properties: aave,
    },
    node2: {
      id: "node2",
      type: "Uniswap:Swap",
      position: {
        x: 505,
        y: 300,
      },
      ports: {
        port1: {
          id: "port1",
          type: "input",
        },
        port2: {
          id: "port2",
          type: "output",
        },
      },
      properties: {
        name: "Uniswap:Swap",
        type: "initial",
      },
      properties: splitter,
    },
    node3: {
      id: "node3",
      type: "End",
      position: {
        x: 510,
        y: 500,
      },
      ports: {
        port1: {
          id: "port1",
          type: "input",
        },
        port2: {
          id: "port2",
          type: "output",
        },
      },
      properties: {
        ...uniswap,
        amountIn: 0,
        amountOutMin: 0,
        path: ["0x0", "0x0"],
        to: "0x0",
        deadline: 0,
      },
    },
    node4: {
      id: "node4",
      type: "uniswap",
      position: {
        x: 500,
        y: 600,
      },
      properties: {
        ...uniswap,
        amountIn: 0,
        amountOutMin: 0,
        path: ["0x0", "0x0"],
        to: "0x0",
        deadline: 0,
      },
    },
  },
  links: {
    link1: {
      id: "link1",
      from: {
        nodeId: "node1",
        portId: "port1",
      },
      to: {
        nodeId: "node2",
        portId: "port1",
      },
      properties: {
        label: "Aave:Flash Loan to Uniswap:Swap",
      },
    },
    link2: {
      id: "link2",
      from: {
        nodeId: "node2",
        portId: "port2",
      },
      to: {
        nodeId: "node3",
        portId: "port1",
      },
      properties: {
        label: "Uniswap:Swap to End",
      },
    },
  },
  selected: {},
  hovered: {},
};
