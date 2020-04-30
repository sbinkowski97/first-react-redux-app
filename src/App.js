import React from "react";
import { ThemeProvider } from "styled-components";
import { Navigation } from "components";
import theme from "utils/theme";
import GlobalStyles from "./index.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <Navigation
          items={[
            {
              content: "Homepage",
              to: "/",
            },
            {
              content: "Budget page",
              to: "/budget",
            },
          ]}
        />
        <Switch>
          <Route exact path="/">
            Homepage
          </Route>
          <Route path="/budget">BudgetPage</Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
