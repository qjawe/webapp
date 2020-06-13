import React, { useEffect } from "react";
import "./App.scss";
import Toolbar from "./components/Toolbar";
import MainView from "./components/MainView";
import "./declarations/index.d.ts";
import Landing from "./components/Landing";
import { Route } from "react-router";

declare global {
  interface Window {
    ethereum: any;
    crate: any;
  }
}

function App() {
  useEffect(() => {
    if (window.crate) {
      window.crate.notify("Hello! ");
    }
  }, []);
  return (
    <>
      <Route
        path="/playground"
        exact
        render={() => (
          <>
            <div className="App">
              <Toolbar />
              <MainView />
            </div>
          </>
        )}
      />
      <Route path="/" exact render={() => <Landing></Landing>} />
    </>
  );
}

export default App;
