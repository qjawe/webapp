import React, { useEffect } from "react";
import "./ChartView.scss";
import { FlowChart, INodeInnerDefaultProps } from "@mrblenny/react-flow-chart";

/**
 * Create the custom component,
 * Make sure it has the same prop signature
 */
const getNodeBackground = (nodeType) => {
  console.log(nodeType);
  switch (nodeType.toLowerCase()) {
    case "aave":
      return "aave-node";
    case "uniswap":
      return "uniswap-node";
    case "kyber":
      return "kyber-node";
    default:
      return "";
  }
};

const getNodeServiceIcon = (nodeType) => {
  switch (nodeType.toLowerCase()) {
    case "aave":
      return (
        <span>
          <img
            src={require("../../assets/service-icons/aave.svg")}
            alt="aave"
            className="service-icon"
          />
        </span>
      );
    case "uniswap":
      return (
        <span role="img" aria-label="unicorn" className="service-icon">
          🦄
        </span>
      );
    case "kyber":
      return (
        <span>
          <img
            src={require("../../assets/service-icons/kyberswap.svg")}
            alt="kyberswap"
            className="service-icon"
          />
        </span>
      );
    default:
      return "";
  }
};
const NodeInnerCustom = ({ node, config }: INodeInnerDefaultProps) => {
  return (
    <div className={`node-inner`}>
      <div
        className={`service-badge ${getNodeBackground(
          node.properties.typeService
        )}`}
      >
        {getNodeServiceIcon(node.properties.typeService)}
        {node.properties.typeService}
      </div>
      <div>{node.properties.name}</div>
      <div className="node-token-icon-container">
        {Object.keys(node.ports).map((port) => (
          <img
            src={require(`../../assets/tokens-icons/${node.ports[port].properties.asset.tokenSymbol}/logo.png`)}
            alt="token-icon"
            className="node-token-icon"
          />
        ))}
      </div>
    </div>
  );
};

function ChartView({ chart, stateActions }: any) {
  useEffect(() => {
    setTimeout(() => {
      changeNodeTextDomEl();
    }, 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chart]);

  // console.log(chart);
  const changeNodeTextDomEl = () => {
    const allNodeTextEl = document.querySelectorAll(".sc-AxhCb");
    allNodeTextEl.forEach((el, i) => {
      const text = el.children[0].textContent;
      if (text && text.split(": ").length >= 2) {
        el.children[0].textContent = text?.split(": ")[1].trim()
          ? text?.split(": ")[1].trim()
          : null;
        // const randomID = (Math.random() * 1e32).toString(36).substring(0, 10);
        // console.log(Object.keys(chart.nodes)[i]);

        var idContainer = document.createElement("div");
        idContainer.className = "node-id-container";
        idContainer.textContent =
          chart.nodes[Object.keys(chart.nodes)[i] + ""].id;
        el.appendChild(idContainer);
        // console.log(chart);
        // setChart(chart);
      }
    });
    addTokenIconDomEl();
  };

  const addTokenIconDomEl = () => {
    const allNodeTextEl = document.querySelectorAll(".sc-AxhCb");
    allNodeTextEl.forEach((el, i) => {
      // console.log(el);
      const text = el.children[1].textContent;
      // console.log(text);
      const selectedNode = Object.keys(chart.nodes).filter(
        (node) => text?.indexOf(chart.nodes[node].id) !== -1
      )[0];
      // console.log(text, selectedNode);
      var imgContainerDom = document.createElement("div");
      imgContainerDom.className = "node-token-icon-container";
      Object.keys(chart.nodes[selectedNode].ports).forEach((port) => {
        const imgDom = createTokenIconDiv(
          chart.nodes[selectedNode].ports[port].properties.asset.tokenSymbol
        );
        // console.log(imgDom);
        imgContainerDom.appendChild(imgDom);
      });
      allNodeTextEl[i].appendChild(imgContainerDom);
    });
  };
  const createTokenIconDiv = (tokenSymbol: string) => {
    var imgDom = document.createElement("img");
    imgDom.src = require(`../../assets/tokens-icons/${tokenSymbol}/logo.png`);
    imgDom.className = "node-token-icon";
    return imgDom;
  };
  return (
    <div className="chart-view">
      <FlowChart
        chart={chart}
        callbacks={stateActions}
        Components={{
          NodeInner: NodeInnerCustom,
        }}
      />
    </div>
  );
}

export default ChartView;
