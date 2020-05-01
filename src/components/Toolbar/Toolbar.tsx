import React, { useContext } from "react";
import "./Toolbar.scss";
import makeBlockie from "ethereum-blockies-base64";
import { shortenAddress } from "../../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { Web3Service } from "../../services";
import { AppContext } from "../../state";

function Toolbar() {
  const ctx = useContext(AppContext);

  const handleConnectWallet = async () => {
    const address = await Web3Service.connectWallet();
    ctx.actions.setWalletAddress(address);
    setShowDropdown(false);
  };

  const [showDropdown, setShowDropdown] = React.useState(false);
  return (
    <div className="toolbar">
      <div className="toolbar-left">
        <div className="toolbar-app-icon">Moneylego</div>
      </div>
      <div className="toolbar-right">
        <div className="toolbar-balance">
          <div className="toolbar-balance-title">Balance</div>
          <div>
            <span>0</span>
            <span> ETH</span>
          </div>
        </div>
        <div className="toolbar-wallet-connect">
          <div className="toolbar-blockie">
            {ctx.state.walletAddress ? (
              <img
                src={makeBlockie(ctx.state.walletAddress)}
                alt="address-blockie"
                className="toolbar-blockie-icon"
              />
            ) : (
              <img
                src={require("../../assets/icons/metamask.png")}
                alt="metamask-icon"
                className="metamask-icon"
              />
            )}
            <span
              className={`status-circle ${
                !ctx.state.walletAddress
                  ? "status-metamask de-active"
                  : "active"
              }`}
            ></span>
          </div>
          <div className="toolbar-address">
            <div className="toolbar-metamask-setting">
              {ctx.state.walletAddress ? "Metamask [MAINNET]" : "Not Connected"}
            </div>
            <div
              className={`toolbar-address ${
                !ctx.state.walletAddress ? "de-active-text" : ""
              }`}
            >
              {ctx.state.walletAddress
                ? shortenAddress(ctx.state.walletAddress)
                : "Connect Wallet"}
            </div>
          </div>
          <div
            className="toolbar-dropdown-icon"
            onClick={(e) => setShowDropdown(!showDropdown)}
          >
            <FontAwesomeIcon
              icon={showDropdown ? faChevronUp : faChevronDown}
            />
          </div>
        </div>
      </div>

      {showDropdown && (
        <div
          className="dropdown-overlay"
          onClick={(e) => setShowDropdown(false)}
        ></div>
      )}
      {showDropdown && (
        <div className="toolbar-dropdown-box">
          <div className="dropdown-title">Connect to Wallet</div>
          <div></div>
          <div className="dropdown-menu-button-container">
            <button
              type="button"
              onClick={handleConnectWallet}
              className="dropdown-menu-button"
            >
              Connect
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Toolbar;
