import React from "react";
import "./NodeDetailsSideBar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCaretDown } from "@fortawesome/free-solid-svg-icons";

function NodeDetailsSideBar({ chart, stateActions }: any) {
  const [openSelect, setOpenSelect] = React.useState(false);
  const [tokenList, setTokenList] = React.useState([
    "ETH",
    "DAI",
    "SAI",
    "BAT",
  ]);
  const openSelectOption = () => {
    setOpenSelect(true);
  };
  return (
    <div className="node-details-side-bar">
      <div className="node-details-header">
        <div className="node-details-header-title">
          <div
            className="node-details-back"
            onClick={(e) => stateActions.onCanvasClick({})}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </div>
          <div className="node-details-title">
            {chart.nodes[chart.selected.id].type}
          </div>
        </div>
        <div className="node-details-header-actions">
          <button
            className="node-details-delete-button"
            onClick={(e) => stateActions.onDeleteKey({})}
          >
            Delete
          </button>
          <button className="node-details-set-button">Set</button>
        </div>
      </div>
      <div className="node-details-summary">
        {Object.keys(chart.nodes[chart.selected.id].ports).map((port, i) => (
          <div className="node-details-input-items" key={i}>
            <label className="node-details-label">
              {chart.nodes[chart.selected.id].ports[port].type}
            </label>
            <div className="node-details-input-field">
              <div className="node-details-asset-select-container">
                <div
                  className="node-details-value-set"
                  onClick={(e) => openSelectOption()}
                >
                  <div className="node-details-value">ETH</div>
                  <FontAwesomeIcon
                    icon={faCaretDown}
                    className="node-details-asset-select-dropdown-icon"
                  />
                </div>
                {openSelect && (
                  <div className="node-details-options-container">
                    <div
                      className="node-details-select-overlay"
                      onClick={(e) => setOpenSelect(false)}
                    ></div>
                    <ul className="node-details-options">
                      {tokenList.map((token, i) => (
                        <li className="node-details-option" key={i}>
                          {token}
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
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NodeDetailsSideBar;
