import React from "react";
import "./App.scss";
import Toolbar from "./components/Toolbar";
import MainView from "./components/MainView";

function App() {
  return (
    <div className="App">
      <Toolbar />
      <MainView />
    </div>
  );
}

export default App;
