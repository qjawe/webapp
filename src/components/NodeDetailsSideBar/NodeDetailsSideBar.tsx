import React, { useState, useEffect } from "react";
import "./NodeDetailsSideBar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { INodeDetailsSideBarState, INodeDetailsSideBarProps } from "./models";
import { ethers } from "ethers";
import { TOKEN_LIST } from "../../constants";

class NodeDetailsSideBar extends React.Component<
  INodeDetailsSideBarProps,
  INodeDetailsSideBarState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      openSelect: false,
      selectedNode: props.chart.nodes[props.chart.selected.id],
      selectedNodePorts: props.chart.nodes[props.chart.selected.id].ports,
      tokenList:
        props.chart.nodes[props.chart.selected.id].type === "Aave:Flash Loan"
          ? TOKEN_LIST.filter((token: any) => token.tokenSymbol === "ETH")
          : TOKEN_LIST,
      selectedDropdown: "",
    };
  }

  componentDidUpdate() {
    const { selectedNode } = this.state;
    if (selectedNode.id !== this.props.chart.selected.id) {
      this.setState(
        {
          selectedNode: this.props.chart.nodes[
            this.props.chart.selected.id + ""
          ],
          selectedNodePorts: this.props.chart.nodes[
            this.props.chart.selected.id + ""
          ].ports,
          tokenList:
            this.props.chart.nodes[this.props.chart.selected.id + ""].type ===
            "Aave:Flash Loan"
              ? TOKEN_LIST.filter((token: any) => token.tokenSymbol === "ETH")
              : TOKEN_LIST,
        },
        () => {}
      );
    }
  }

  openSelectOption = (port: string) => {
    this.setState({ selectedDropdown: port, openSelect: true });
  };

  setAsset = (token: any, port: string) => {
    // console.log(token);
    const { selectedNodePorts } = this.state;
    selectedNodePorts[port].properties.asset = token;
    this.setState({ selectedNodePorts, openSelect: false }, () => {
      this.setNodeProperties(false);
    });
  };

  setAssetAmount = (amount: string, port: string) => {
    const { selectedNodePorts } = this.state;
    selectedNodePorts[port].properties.amount = amount;
    this.setState({ selectedNodePorts }, () => {
      this.setNodeProperties(false);
    });
  };

  setNodeProperties = (flag: boolean) => {
    try {
      const { chart, setChart, stateActions } = this.props;
      const { selectedNodePorts, selectedNode } = this.state;
      chart.nodes[selectedNode.id].ports = selectedNodePorts;
      chart.nodes[selectedNode.id].properties.path = ["0x00", "0x00"];
      Object.keys(selectedNodePorts).forEach((port) => {
        if (selectedNodePorts[port].properties.type === "input") {
          chart.nodes[
            selectedNode.id
          ].properties.amountIn = ethers.utils.parseUnits(
            selectedNodePorts[port].properties.amount + "",
            "ether"
          );
          chart.nodes[selectedNode.id].properties.path[0] =
            selectedNodePorts[port].properties.asset.tokenAddress;
        }
        if (selectedNodePorts[port].properties.type === "output") {
          chart.nodes[
            selectedNode.id
          ].properties.amountOutMin = ethers.utils.parseUnits(
            selectedNodePorts[port].properties.amount + "",
            "ether"
          );

          chart.nodes[selectedNode.id].properties.path[1] =
            selectedNodePorts[port].properties.asset.tokenAddress;
        }
      });
      setChart(chart);
      if (flag) {
        stateActions.onCanvasClick({});
      }
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const {
      selectedNodePorts,
      openSelect,
      selectedDropdown,
      tokenList,
    } = this.state;
    return (
      <div className="node-details-side-bar">
        <div className="node-details-header">
          <div className="node-details-header-title">
            <div
              className="node-details-back"
              onClick={(e) => this.props.stateActions.onCanvasClick({})}
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </div>
            <div className="node-details-title">
              {this.props.chart.nodes[this.props.chart.selected.id + ""].type}
            </div>
          </div>
          <div className="node-details-header-actions">
            <button
              className="node-details-delete-button"
              onClick={(e) => this.props.stateActions.onDeleteKey({})}
            >
              Delete
            </button>
            <button
              className="node-details-set-button"
              onClick={(e) => this.setNodeProperties(true)}
            >
              Set
            </button>
          </div>
        </div>
        <div className="node-details-summary">
          {Object.keys(selectedNodePorts).map((port: string, i) => (
            <div className="node-details-input-items" key={i}>
              <label className="node-details-label">
                {selectedNodePorts[port].properties.type}
              </label>
              <div className="node-details-input-field">
                <div className="node-details-asset-select-container">
                  <div
                    className="node-details-value-set"
                    onClick={(e) => this.openSelectOption(port)}
                  >
                    <div className="node-details-token-container">
                      <div className="node-details-token-icon-container">
                        <img
                          src={require(`../../assets/tokens-icons/${selectedNodePorts[
                            port
                          ].properties.asset.tokenAddress.toLowerCase()}/logo.png`)}
                          alt="token-icon"
                          className="node-details-token-icon"
                        />
                      </div>
                      <div className="node-details-value">
                        {selectedNodePorts[port].properties.asset.tokenSymbol}
                      </div>
                    </div>
                    <FontAwesomeIcon
                      icon={faCaretDown}
                      className="node-details-asset-select-dropdown-icon"
                    />
                  </div>
                  {openSelect && selectedDropdown === port && (
                    <div className="node-details-options-container">
                      <div
                        className="node-details-select-overlay"
                        onClick={(e) => this.setState({ openSelect: false })}
                      ></div>
                      <ul className="node-details-options">
                        {tokenList.map((token: any, i: number) => (
                          <li
                            className="node-details-option"
                            key={i}
                            onClick={(e) => this.setAsset(token, port)}
                          >
                            <span className="token-list-icon-container">
                              <img
                                src={require(`../../assets/tokens-icons/${token.tokenAddress.toLowerCase()}/logo.png`)}
                                alt="token-icon"
                                className="token-list-icon"
                              />
                            </span>
                            <span className="token-list-address">
                              {token.tokenSymbol}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                <div className="node-details-asset-amount-container">
                  <input
                    type="number"
                    className="node-details-asset-amount"
                    placeholder="Amount"
                    value={
                      Number.parseFloat(
                        selectedNodePorts[port].properties.amount
                      ) === 0
                        ? ""
                        : selectedNodePorts[port].properties.amount
                    }
                    onChange={(e) => this.setAssetAmount(e.target.value, port)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default NodeDetailsSideBar;
