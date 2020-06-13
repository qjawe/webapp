import React, { useContext } from "react";
import "./ChartTopBar.scss";
import ToolboxItem from "../ToolboxItem";
import {
  Aave,
  Uniswap,
  Kyberswap,
  End,
  UniswapAddLiquidity
} from "../../services/BlocksService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisV,
  faFileImport,
  faFileExport
} from "@fortawesome/free-solid-svg-icons";
import { TOKEN_LIST, UNI_TOKEN_LIST } from "../../constants";
import { AppContext } from "../../state";

function ChartTopBar({ chart }: any) {
  const ctx = useContext(AppContext);

  const [showToolboxMenu, setShowToolboxMenu] = React.useState(false);
  const aave = Aave();
  const uniswap = Uniswap();
  const uniswapAddLiquidity = UniswapAddLiquidity();
  const end = End();

  const exportFlow = async () => {
    const fileName = "chart-flow-" + new Date().getTime();
    const json = JSON.stringify(chart);
    const blob = new Blob([json], { type: "application/json" });
    const href = await URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = href;
    link.download = fileName + ".json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const openImportModal = () => {
    ctx.actions.setModalConfig(true, { type: "import-flow" });
    setShowToolboxMenu(false);
  };
  return (
    <div className="chart-top-bar">
      <div className="chart-toolbox-item-container">
        <ToolboxItem
          type="Aave:Flash Loan"
          ports={{
            port1: {
              id: "port1",
              type: "bottom",
              properties: {
                type: "reserve",
                amount: 0,
                asset: TOKEN_LIST[0]
              }
            }
          }}
          properties={{
            ...aave
          }}
        />
        <ToolboxItem
          type="Uniswap:Swap"
          ports={{
            port1: {
              id: "port1",
              type: "top",
              properties: {
                type: "input",
                amount: 0,
                asset: TOKEN_LIST[0]
              }
            },
            port2: {
              id: "port2",
              type: "bottom",
              properties: {
                type: "output",
                amount: 0,
                asset: TOKEN_LIST[1]
              }
            }
          }}
          properties={{
            ...uniswap
          }}
        />
        <ToolboxItem
          type="Kyberswap:Swap"
          ports={{
            port1: {
              id: "port1",
              type: "top",
              properties: {
                type: "input",
                amount: 0,
                asset: TOKEN_LIST[0]
              }
            },
            port2: {
              id: "port2",
              type: "bottom",
              properties: {
                type: "output",
                amount: 0,
                asset: TOKEN_LIST[1]
              }
            }
          }}
          properties={{
            ...Kyberswap
          }}
        />
        <ToolboxItem
          type="Uniswap:Add Liquidity"
          ports={{
            port1: {
              id: "port1",
              type: "top",
              properties: {
                type: "input",
                amount: 0,
                asset: TOKEN_LIST[0]
              }
            },
            port2: {
              id: "port2",
              type: "top",
              properties: {
                type: "input",
                amount: 0,
                asset: TOKEN_LIST[1]
              }
            },
            port3: {
              id: "port3",
              type: "bottom",
              properties: {
                type: "output",
                amount: 0,
                asset: UNI_TOKEN_LIST[0]
              }
            }
          }}
          properties={{
            ...uniswapAddLiquidity
          }}
        />
        <ToolboxItem
          type="End"
          ports={{
            port1: {
              id: "port1",
              type: "top",
              properties: {
                type: "input",
                amount: 0,
                asset: TOKEN_LIST[0]
              }
            }
          }}
          properties={{
            ...end
          }}
        />
      </div>
      <div className="chart-toolbox-menu-container">
        <div
          className="toolbar-dropdown-icon"
          onClick={e => setShowToolboxMenu(!showToolboxMenu)}
        >
          <FontAwesomeIcon icon={faEllipsisV} />
        </div>
        {showToolboxMenu && (
          <div
            className="menu-overlay"
            onClick={e => setShowToolboxMenu(false)}
          ></div>
        )}
        {showToolboxMenu && (
          <div className="toolbar-menu-box">
            <div className="toolbar-menu-box-item" onClick={openImportModal}>
              <span>
                <FontAwesomeIcon icon={faFileImport} />
              </span>
              <span className="toolbar-menu-box-item-title">Import Flow</span>
            </div>
            <div className="toolbar-menu-box-item" onClick={exportFlow}>
              <span>
                <FontAwesomeIcon icon={faFileExport} />
              </span>
              <span className="toolbar-menu-box-item-title">Export Flow</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ChartTopBar;
