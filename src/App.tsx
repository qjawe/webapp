import React from "react";
import "./App.scss";
import Toolbar from "./components/Toolbar";
import MainView from "./components/MainView";
import "./declarations/index.d.ts";
import Landing from "./components/Landing";
import { withRouter, Route, Redirect } from "react-router";
import { AppContext } from "./state";

declare global {
  interface Window {
    ethereum: any;
  }
}

function App() {
  const ctx = React.useContext(AppContext);
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
