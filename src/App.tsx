import React, { useContext } from "react";
import "./App.scss";
import { AppContext } from "./state";
import { Web3Service } from "./services";
import Toolbar from "./components/Toolbar";

function App() {
  const ctx = useContext(AppContext);
  return (
    <div className="App">
      <Toolbar />
      <div>{ctx.state.graph}</div>
      <div>
        <button type="button" onClick={Web3Service.connectWallet}>
          Connect
        </button>
      </div>
    </div>
  );
}

export default App;
