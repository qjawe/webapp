import React, { useEffect, useState } from "react";
import "./SimulationSideBar.scss";
import {
  buildTransaction,
  showSimulation
} from "../../services/SimulationService";
import { IChart } from "@mrblenny/react-flow-chart";
import { ethers } from "ethers";
import { AppContext } from "../../state";
import { findInitialNodes } from "../../utils/ChartUtils";

import {
  FLASHLOAN_ABI,
  FLASHLOAN_ADDRESS,
  AAVE_ETHEREUM
} from "../../constants";
import _ from "lodash";

declare var web3: any;

export interface ISimulationSideBarProps {
  chart: IChart;
}

function SimulationSideBar({ chart }: ISimulationSideBarProps) {
  const ctx = React.useContext(AppContext);
  const initialState = { loading: false, error: false, tx: "" };
  const [state, setState] = useState(initialState);
  const [simulations, setSimulations] = useState([]);
  const [totalTokensProfit, setTotalTokensProfit] = useState([]);

  useEffect(() => {
  const showChartSimulation = async () => {
    const { simulations, totalTokensProfit } = await showSimulation(chart);
    let parsedSimulations = [];
    simulations.forEach(simulation => {
      if (parsedSimulations.length) {
        let hasNameCheck = false;
        let selectedSimulation = 0;
        parsedSimulations.forEach((parsedSimulation, i) => {
          if (parsedSimulation.nodeName === simulation.name) {
            hasNameCheck = true;
            selectedSimulation = i;
          }
        });
        if (hasNameCheck) {
          parsedSimulations[selectedSimulation].children.push({
            amount: simulation.amount,
            token: simulation.token,
            message: simulation.message,
            type: simulation.type
          });
        } else {
          parsedSimulations.push({
            nodeName: simulation.name,
            children: [
              {
                amount: simulation.amount,
                token: simulation.token,
                message: simulation.message,
                type: simulation.type
              }
            ]
          });
        }
      } else {
        parsedSimulations.push({
          nodeName: simulation.name,
          children: [
            {
              amount: simulation.amount,
              token: simulation.token,
              message: simulation.message,
              type: simulation.type
            }
          ]
        });
      }
    });

    setSimulations(parsedSimulations);
    setTotalTokensProfit(totalTokensProfit);
  };

    // if (!state.loading) return;
    showChartSimulation();
  }, [showChartSimulation]);

  if (state.loading) {
    return <div className="simulation-side-bar"></div>;
  }

  const submitTransaction = () => {
    setState({ loading: true, error: false, tx: "" });
    buildTransaction(chart).then(
      (tx: any) => {
        setState({ loading: false, error: false, tx: JSON.stringify(tx) });
        const provider = new ethers.providers.Web3Provider(
          web3.currentProvider
        );
        const signer = provider.getSigner();

        const Executor = new ethers.Contract(
          FLASHLOAN_ADDRESS,
          FLASHLOAN_ABI,
          signer
        );
        const legs = tx.map((item: any) => {
          return { to: item.to, input: item.input, value: "0", callType: 0 };
        });

        const initalNodes = findInitialNodes(chart);

        if (initalNodes.length !== 1) {
          setState({ loading: false, error: true, tx: "" });
        }

        const ethAmount = Object.values(initalNodes[0].ports)[0].properties
          .amount;
        const amount = ethers.utils.parseEther(ethAmount);

        Executor.run(AAVE_ETHEREUM, amount, legs).then(() => {
          console.log("done");
        });
      }
      // (x: any) => {
      //   setState({ loading: false, error: true, tx: "" });
      // }
    );
  };

  return (
    <div className="simulation-side-bar">
      <div className="simulation-title">Simulation</div>
      <div className="simulation-summary">
        {simulations.map(simulation => (
          <div className="simulation-summary-item">
            <div className="simulation-summary-node-name">
              {simulation.nodeName}
            </div>
            {simulation.children.map(child => (
              <div className="simulation-summary-children-container">
                <div className="simulation-summary-children-message">
                  {child.message}
                </div>
                <div className="simulation-summary-children-icon">
                  <img
                    src={require(`../../assets/tokens-icons/${child.token.tokenSymbol}/logo.png`)}
                    alt="token-icon"
                    className="simulation-token-icon"
                  />
                </div>
                <div
                  className={`simulation-summary-children-amount ${
                    child.type === "spend" ? "lost" : "success"
                  }`}
                >
                  {child.type === "spend" ? "-" : "+"}
                  {Math.abs(child.amount)}
                </div>
                <div
                  className={`simulation-summary-children-token-symbol ${
                    child.type === "spend" ? "lost" : "success"
                  }`}
                >
                  {child.token.tokenSymbol}
                </div>
              </div>
            ))}
          </div>
        ))}
        <div className="simulation-summary-item">
          <div className="simulation-summary-node-name">Summary</div>
          {totalTokensProfit.map(token => (
            <div className="simulation-summary-children-container">
              <div className="simulation-summary-children-message">
                {token.amount < 0 ? "You lost" : "You profit"}
              </div>
              <div className="simulation-summary-children-icon">
                <img
                  src={require(`../../assets/tokens-icons/${token.token.tokenSymbol}/logo.png`)}
                  alt="token-icon"
                  className="simulation-token-icon"
                />
              </div>
              <div
                className={`simulation-summary-children-amount ${
                  token.amount < 0
                    ? "lost"
                    : token.amount === 0
                    ? ""
                    : "success"
                }`}
              >
                {token.amount < 0 ? "-" : token.amount === 0 ? "" : "+"}
                {Math.abs(token.amount)}
              </div>
              <div
                className={`simulation-summary-children-token-symbol ${
                  token.amount < 0
                    ? "lost"
                    : token.amount === 0
                    ? ""
                    : "success"
                }`}
              >
                {token.token.tokenSymbol}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="simulation-button-container">
        <button
          type="button"
          className="simulation-button"
          onClick={submitTransaction}
          disabled={!ctx.state.walletAddress}
        >
          Execute Transaction
        </button>
      </div>
    </div>
  );
}

export default SimulationSideBar;
