import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  fetchBudget,
  fetchBudgetCategories,
  addTransaction,
} from "data/actions/budget.actions";
import { Switch, Route, useHistory } from "react-router-dom";
import { fetchAllCategories } from "data/actions/common.actions";
import { Grid } from "./Budget.css";
import common from "data/reducers/common.reducer";
import { useMemo } from "react";
import { LoadingIndicator, Modal, Button } from "components";
import BudgetCategoryList from "pages/Budget/components/BudgetCategoryList";
import BudgetTransactionList from "pages/Budget/components/BudgetTransactionList";
import AddTransactionForm from "pages/Budget/components/AddTransactionForm";
function Budget({
  budget,
  commonState,
  budgetState,
  fetchBudget,
  fetchBudgetCategories,
  fetchAllCategories,
  allCategories,
  addTransaction,
}) {
  useEffect(() => {
    fetchBudget(1);
    fetchBudgetCategories(1);
    fetchAllCategories();
  }, [fetchBudget, fetchBudgetCategories, fetchAllCategories]);

  const history = useHistory();
  const isLoaded = useMemo(
    () =>
      !!commonState &&
      Object.keys(commonState).length === 0 &&
      !!budgetState &&
      Object.keys(budgetState).length === 0,
    [commonState, budgetState]
  );

  const handleSubmitAddTransaction = (value) => {
    addTransaction({
      budgetId: budget.id,
      data: value,
    }).then(history.goBack());
  };
  return (
    <>
      <Grid>
        <section>
          {isLoaded ? <BudgetCategoryList /> : <LoadingIndicator />}
        </section>
        <section>
          {isLoaded ? (
            <>
              <Button to="/budget/transactions/new">Add New Transaction</Button>
              <BudgetTransactionList />
            </>
          ) : (
            <LoadingIndicator />
          )}
        </section>
      </Grid>
      <Switch>
        <Route path="/budget/transactions/new/">
          <Modal>
            <AddTransactionForm
              categories={allCategories}
              onSubmit={handleSubmitAddTransaction}
            />
          </Modal>
        </Route>
      </Switch>
    </>
  );
}

export default connect(
  (state) => {
    return {
      budget: state.budget.budget,
      commonState: state.common.loadingState,
      budgetState: state.budget.loadingState,
      allCategories: state.common.allCategories,
    };
  },
  {
    fetchBudget,
    fetchBudgetCategories,
    fetchAllCategories,
    addTransaction,
  }
)(Budget);
