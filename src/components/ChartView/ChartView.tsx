import React, { useEffect } from "react";
import "./ChartView.scss";
import { FlowChart } from "@mrblenny/react-flow-chart";

function ChartView({ chart, stateActions }: any) {
  useEffect(() => {
    setTimeout(() => {
      changeNodeTextDomEl();
    }, 1);
  }, []);

  const changeNodeTextDomEl = () => {
    const allNodeTextEl = document.querySelectorAll(".sc-AxhCb");
    allNodeTextEl.forEach((el) => {
      const text = el.children[0].textContent;
      if (text && text.split(": ").length >= 2) {
        el.children[0].textContent = text?.split(": ")[1].trim()
          ? text?.split(": ")[1].trim()
          : null;
      }
    });
    addTokenIconDomEl();
  };

  const addTokenIconDomEl = () => {
    const allNodeTextEl = document.querySelectorAll(".sc-AxhCb");
    allNodeTextEl.forEach((el, i) => {
      const text = el.children[0].textContent;
      const selectedNode = Object.keys(chart.nodes).filter(
        (node) => text?.indexOf(chart.nodes[node].type) !== -1
      )[0];
      // console.log(text, selectedNode);
      var imgContainerDom = document.createElement("div");
      imgContainerDom.className = "node-token-icon-container";
      Object.keys(chart.nodes[selectedNode].ports).forEach((port) => {
        const imgDom = createTokenIconDiv(
          chart.nodes[selectedNode].ports[port].properties.asset.tokenAddress
        );
        // console.log(imgDom);
        imgContainerDom.appendChild(imgDom);
      });
      allNodeTextEl[i].appendChild(imgContainerDom);
    });
  };
  const createTokenIconDiv = (tokenAddress: string) => {
    var imgDom = document.createElement("img");
    imgDom.src = require(`../../assets/tokens-icons/${tokenAddress.toLowerCase()}/logo.png`);
    imgDom.className = "node-token-icon";
    return imgDom;
  };
  return (
    <div className="chart-view">
      <FlowChart chart={chart} callbacks={stateActions} />
    </div>
  );
}

export default ChartView;
