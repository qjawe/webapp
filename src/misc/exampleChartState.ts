import { IChart } from "@mrblenny/react-flow-chart";

export const chartSimple: IChart = {
  offset: {
    x: 0,
    y: 0,
  },
  scale: 1,
  nodes: {
    node1: {
      id: "node1",
      type: "flash-loan",
      position: {
        x: 300,
        y: 100,
      },
      ports: {
        port1: {
          id: "port1",
          type: "output",
          properties: {
            value: "yes",
          },
        },
      },
      properties: {
        type: "initial",
      },
    },
    node2: {
      id: "node2",
      type: "splitter",
      position: {
        x: 300,
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
        port3: {
          id: "port3",
          type: "output",
        },
      },
    },
    node3: {
      id: "node3",
      type: "uniswap",
      position: {
        x: 100,
        y: 600,
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
    },
    node4: {
      id: "node4",
      type: "uniswap",
      position: {
        x: 500,
        y: 600,
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
        label: "example link label",
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
        label: "another example link label",
      },
    },
    link3: {
      id: "link3",
      from: {
        nodeId: "node2",
        portId: "port3",
      },
      to: {
        nodeId: "node4",
        portId: "port1",
      },
    },
  },
  selected: {},
  hovered: {},
};
