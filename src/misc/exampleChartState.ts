import { IChart } from "@mrblenny/react-flow-chart";
import { Aave, Uniswap, Kyberswap, End } from "../services/BlocksService";
import { ethers } from "ethers";
import { TOKEN_LIST } from "../constants";

const aave = Aave();
const uniswap = Uniswap();
// const splitter = Splitter();
const kyberswap = Kyberswap();
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
      position: { x: 582, y: 63 },
      ports: {
        port1: {
          id: "port1",
          type: "output",
          properties: {
            type: "reserve",
            amount: "1",
            asset: TOKEN_LIST[0],
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
        x: 341,
        y: 329,
      },
      ports: {
        port1: {
          id: "port1",
          type: "input",
          properties: {
            type: "input",
            amount: "",
            asset: TOKEN_LIST[0],
          },
        },
        port2: {
          id: "port2",
          type: "output",
          properties: {
            type: "output",
            amount: "",
            asset: TOKEN_LIST[1],
          },
        },
      },
      properties: {
        ...uniswap,
        name: "Uniswap:Swap",
        nodeType: "swap",
        amountIn: ethers.utils.parseUnits("10", "ether"),
        amountOutMin: ethers.utils.parseUnits("9.9", "ether"),
        path: [
          "0xff795577d9ac8bd7d90ee22b6c1703490b6512fd",
          "0xaaf64bfcc32d0f15873a02163e7e500671a4ffcd",
        ],
        to: "0x038AD9777dC231274553ff927CcB0Fd21Cd42fb9",
        deadline: 1590969600,
      },
    },
    node3: {
      id: "node3",
      type: "Kyberswap:Swap",
      position: {
        x: 822,
        y: 326,
      },
      ports: {
        port1: {
          id: "port1",
          type: "input",
          properties: {
            type: "input",
            amount: "",
            asset: TOKEN_LIST[1],
          },
        },
        port2: {
          id: "port2",
          type: "output",
          properties: {
            type: "output",
            amount: "",
            asset: TOKEN_LIST[0],
          },
        },
      },
      properties: {
        ...kyberswap,
      },
    },
    node4: {
      id: "node4",
      type: "End",
      position: {
        x: 581,
        y: 597,
      },
      ports: {
        port1: {
          id: "port1",
          type: "input",
          properties: {
            type: "end",
            amount: "",
            asset: TOKEN_LIST[0],
          },
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
        label: "Uniswap:Swap to Kyberswap:swap",
      },
    },
    link3: {
      id: "link3",
      from: {
        nodeId: "node3",
        portId: "port2",
      },
      to: {
        nodeId: "node4",
        portId: "port1",
      },
      properties: {
        label: "Kyberswap:swap to End",
      },
    },
  },
  selected: {},
  hovered: {},
};
