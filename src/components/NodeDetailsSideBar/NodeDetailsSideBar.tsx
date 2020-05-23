import React from "react";
import "./NodeDetailsSideBar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { INodeDetailsSideBarState, INodeDetailsSideBarProps } from "./models";
import { ethers } from "ethers";
import { TOKEN_LIST } from "../../constants";
import { Web3Service } from "../../services";

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
      priceImpact: this.props.chart.nodes[this.props.chart.selected.id + ""]
        .properties.priceImpact
        ? this.props.chart.nodes[this.props.chart.selected.id + ""].properties
            .priceImpact
        : 0,
      price: this.props.chart.nodes[this.props.chart.selected.id + ""]
        .properties.price
        ? this.props.chart.nodes[this.props.chart.selected.id + ""].properties
            .price
        : "",
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
          priceImpact: this.props.chart.nodes[this.props.chart.selected.id + ""]
            .properties.priceImpact
            ? this.props.chart.nodes[this.props.chart.selected.id + ""]
                .properties.priceImpact
            : 0,
          price: this.props.chart.nodes[this.props.chart.selected.id + ""]
            .properties.price
            ? this.props.chart.nodes[this.props.chart.selected.id + ""]
                .properties.price
            : "",
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
    selectedNodePorts[port].properties.amount = "";
    this.setState(
      { selectedNodePorts, openSelect: false, price: "", priceImpact: 0 },
      () => {
        this.setNodeProperties(false);
        if (
          selectedNodePorts[Object.keys(selectedNodePorts)[0]].properties
            .amount ||
          selectedNodePorts[Object.keys(selectedNodePorts)[1]].properties.amount
        ) {
          const isExactIn = selectedNodePorts[port].properties.type !== "input";
          const amount = isExactIn
            ? selectedNodePorts[Object.keys(selectedNodePorts)[0]].properties
                .amount
            : selectedNodePorts[Object.keys(selectedNodePorts)[1]].properties
                .amount;
          isExactIn
            ? this.getSwapValues(true, amount)
            : this.getSwapValues(false, amount);
        }
      }
    );
  };

  setAssetAmount = (amount: string, port: string) => {
    const { selectedNodePorts } = this.state;
    const isExactIn = selectedNodePorts[port].properties.type === "input";
    selectedNodePorts[
      Object.keys(selectedNodePorts)[0]
    ].properties.amount = isExactIn ? amount : "";

    if(Object.keys(selectedNodePorts)[1]) {
      selectedNodePorts[
        Object.keys(selectedNodePorts)[1]
      ].properties.amount = isExactIn ? "" : amount;
    }

    this.setState({ selectedNodePorts, priceImpact: 0, price: "" }, () => {
      this.setNodeProperties(false, null, null, null, null, isExactIn);
      isExactIn
        ? this.getSwapValues(true, amount)
        : this.getSwapValues(false, amount);
    });
  };

  getSwapValues = async (isExactIn: boolean, amount) => {
    if (amount && amount !== "0") {
      const { selectedNodePorts, selectedNode } = this.state;

      const typeService = selectedNode.properties.typeService;
      console.log(selectedNode, typeService);
      if (typeService === "Aave") {
        selectedNodePorts[
          Object.keys(selectedNodePorts)[0]
        ].properties.amount = amount;

        return;
      }

      const tokenInAddress =
        selectedNodePorts[Object.keys(selectedNodePorts)[0]].properties.asset
          .tokenAddress;
      const tokenOutAddress =
        selectedNodePorts[Object.keys(selectedNodePorts)[1]].properties.asset
          .tokenAddress;
      const result = await Web3Service.getSwapPriceValues(
        typeService,
        amount,
        tokenInAddress,
        tokenOutAddress,
        isExactIn
      );
      if (result) {
        if (typeService === "Uniswap") {
          const {
            amountsIn,
            amountsOut,
            executionPrice,
            priceImpact,
            path,
            bestTrade,
          } = result;
          selectedNodePorts[
            Object.keys(selectedNodePorts)[0]
          ].properties.amount = amountsIn;
          selectedNodePorts[
            Object.keys(selectedNodePorts)[1]
          ].properties.amount = amountsOut;
          const price = isExactIn
            ? `${amountsOut}  ${
                selectedNodePorts[Object.keys(selectedNodePorts)[1]].properties
                  .asset.tokenSymbol
              } per ${
                selectedNodePorts[Object.keys(selectedNodePorts)[0]].properties
                  .asset.tokenSymbol
              }`
            : `${amountsIn}  ${
                selectedNodePorts[Object.keys(selectedNodePorts)[0]].properties
                  .asset.tokenSymbol
              } per ${
                selectedNodePorts[Object.keys(selectedNodePorts)[1]].properties
                  .asset.tokenSymbol
              }`;
          this.setState({ selectedNodePorts, priceImpact, price }, () => {
            this.setNodeProperties(
              false,
              path,
              executionPrice,
              priceImpact,
              price,
              null,
              bestTrade
            );
          });
        } else if (typeService === "Kyber") {
          const { amountsIn, amountsOut, executionPrice, priceImpact } = result;
          selectedNodePorts[
            Object.keys(selectedNodePorts)[0]
          ].properties.amount = amountsIn;
          selectedNodePorts[
            Object.keys(selectedNodePorts)[1]
          ].properties.amount = amountsOut;
          const price = isExactIn
            ? `${amountsOut}  ${
                selectedNodePorts[Object.keys(selectedNodePorts)[1]].properties
                  .asset.tokenSymbol
              } per ${
                selectedNodePorts[Object.keys(selectedNodePorts)[0]].properties
                  .asset.tokenSymbol
              }`
            : `${amountsIn}  ${
                selectedNodePorts[Object.keys(selectedNodePorts)[0]].properties
                  .asset.tokenSymbol
              } per ${
                selectedNodePorts[Object.keys(selectedNodePorts)[1]].properties
                  .asset.tokenSymbol
              }`;
          this.setState({ selectedNodePorts, priceImpact, price }, () => {
            this.setNodeProperties(
              false,
              null,
              executionPrice,
              priceImpact,
              price
            );
          });
        }
      }
    }
  };

  setNodeProperties = (
    flag: boolean,
    path?: string[],
    executionPrice?: number,
    priceImpact?: number,
    price?: string,
    isExactIn?: boolean,
    bestTrade?: any
  ) => {
    try {
      const { chart, setChart, stateActions } = this.props;
      const { selectedNodePorts, selectedNode } = this.state;
      chart.nodes[selectedNode.id].ports = selectedNodePorts;
      if (path) {
        chart.nodes[selectedNode.id].properties.path = path;
      }
      if (executionPrice) {
        chart.nodes[selectedNode.id].properties.executionPrice = executionPrice;
      }
      if (priceImpact) {
        chart.nodes[selectedNode.id].properties.priceImpact = priceImpact;
      }
      if (price) {
        chart.nodes[selectedNode.id].properties.price = price;
      }
      if (isExactIn) {
        chart.nodes[selectedNode.id].properties.isExactIn = isExactIn;
      }
      if (bestTrade) {
        console.log(JSON.stringify(bestTrade));
        chart.nodes[selectedNode.id].properties.bestTrade = bestTrade;
      }
      Object.keys(selectedNodePorts).forEach((port) => {
        if (selectedNodePorts[port].properties.type === "input") {
          chart.nodes[
            selectedNode.id
          ].properties.amountIn = ethers.utils.parseUnits(
            (selectedNodePorts[port].properties.amount
              ? selectedNodePorts[port].properties.amount
              : 0) + "",
            "ether"
          );
          chart.nodes[selectedNode.id].properties.tokenIn =
            selectedNodePorts[port].properties.asset.tokenAddress;
        }
        if (selectedNodePorts[port].properties.type === "output") {
          chart.nodes[
            selectedNode.id
          ].properties.amountOutMin = ethers.utils.parseUnits(
            (selectedNodePorts[port].properties.amount
              ? selectedNodePorts[port].properties.amount
              : 0) + "",
            "ether"
          );
          chart.nodes[selectedNode.id].properties.tokenOut =
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
                          src={require(`../../assets/tokens-icons/${selectedNodePorts[port].properties.asset.tokenSymbol}/logo.png`)}
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
                                src={require(`../../assets/tokens-icons/${token.tokenSymbol}/logo.png`)}
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
                    value={selectedNodePorts[port].properties.amount}
                    onChange={(e) => this.setAssetAmount(e.target.value, port)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        {this.state.price || this.state.priceImpact ? (
          <div className="node-details-additional-info">
            {this.state.price && (
              <div className="node-details-additional-info-item">
                <span>Price</span>
                <span className="node-details-additional-info-item-value">
                  {this.state.price}
                </span>
              </div>
            )}
            {this.state.priceImpact && (
              <div className="node-details-additional-info-item">
                <span>Price Impact</span>
                <span className="node-details-additional-info-item-price-impact">
                  {this.state.priceImpact}%
                </span>
              </div>
            )}
          </div>
        ) : null}
      </div>
    );
  }
}

export default NodeDetailsSideBar;
