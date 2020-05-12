import React, { Fragment, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { Navigation, Wrapper, LoadingIndicator, Button } from "components";
import theme from "utils/theme";
import GlobalStyles from "./index.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import {
  fetchBudget,
  fetchBudgetCategories,
} from "./data/actions/budget.actions";
function App({ budget, fetchBudget, fetchBudgetCategories }) {
  useEffect(() => {
    fetchBudget(1);
    fetchBudgetCategories(1);
  }, [fetchBudget, fetchBudgetCategories]);

  const { i18n } = useTranslation();

  return (
    <Fragment>
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
          RightElement={
            <div>
              <Button
                variant="regular"
                onClick={() => i18n.changeLanguage("pl")}
              >
                pl
              </Button>
              <Button
                variant="regular"
                onClick={() => i18n.changeLanguage("en")}
              >
                en
              </Button>
            </div>
          }
        />
        <Wrapper>
          <Switch>
            <Route exact path="/">
              Homepage
            </Route>
            <Route path="/budget">BudgetPage</Route>
          </Switch>
        </Wrapper>
      </Router>
    </Fragment>
  );
}

const ConnectedApp = connect(
  (state) => {
    return {
      budget: state.budget.budget,
    };
  },
  {
    fetchBudget,
    fetchBudgetCategories,
  }
)(App);

function RootApp() {
  return (
    <ThemeProvider theme={theme}>
      <React.Suspense fallback={<LoadingIndicator />}>
        <ConnectedApp />
      </React.Suspense>
    </ThemeProvider>
  );
}

export default RootApp;
