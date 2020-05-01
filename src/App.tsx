import React, { useContext } from "react";
import "./App.scss";
import { AppContext } from "./state";
import { Web3Service } from "./services";
import Toolbar from "./components/Toolbar";
import MainView from "./components/MainView";

function App() {
  const ctx = useContext(AppContext);
  return (
    <div className="App">
      <Toolbar />
      <MainView />
    </div>
  );
}

export default App;
