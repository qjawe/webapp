import React from "react";
import "./App.scss";
import Toolbar from "./components/Toolbar";
import MainView from "./components/MainView";
import "./declarations/index.d.ts";
import ChatButton from "./components/ChatButton";
import { AppContext } from "./state";

declare global {
  interface Window {
    ethereum: any;
  }
}

function App() {
  const ctx = React.useContext(AppContext);
  return (
    <div className="App">
      <Toolbar />
      <MainView />
      <ChatButton walletAddress={ctx.state.walletAddress} />
    </div>
  );
}

export default App;
