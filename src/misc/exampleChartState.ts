import { IChart } from "@mrblenny/react-flow-chart";
import { Aave, Uniswap, Splitter, End } from "../services/BlocksService";
import { ethers } from "ethers";

const aave = Aave();
const uniswap = Uniswap();
const splitter = Splitter();
const end = End();

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
            type: "reserve",
            amount: 0,
            asset: "ETH",
          },
        },
      },
      properties: {
        ...aave,
        name: "Aave:Flash Loan",
        type: "initial",
        nodeType: "flashLoan",
      },
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
          properties: {
            type: "input",
            amount: 0,
            asset: "ETH",
          },
        },
        port2: {
          id: "port2",
          type: "output",
          properties: {
            type: "output",
            amount: 0,
            asset: "ETH",
          },
        },
      },
      properties: {
        ...uniswap,
        name: "Uniswap:Swap",
        nodeType: "swap",
        amountIn: ethers.utils.parseUnits('10', 'ether'),
        amountOutMin: ethers.utils.parseUnits('9.9', 'ether'),
        path: ['0xff795577d9ac8bd7d90ee22b6c1703490b6512fd', '0xaaf64bfcc32d0f15873a02163e7e500671a4ffcd'],
        to: '0x038AD9777dC231274553ff927CcB0Fd21Cd42fb9',
        deadline: 1590969600,        
      },
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
          properties: {
            type: "end",
            amount: 0,
            asset: "ETH",
          },
        },
        port2: {
          id: "port2",
          type: "output",
        },
      },
      properties: {
        ...end,
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
