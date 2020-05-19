import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  fetchBudget,
  fetchBudgetCategories,
} from "data/actions/budget.actions";
import { fetchAllCategories } from "data/actions/common.actions";
import { Grid } from "./Budget.css";
import common from "data/reducers/common.reducer";
import { useMemo } from "react";
import { LoadingIndicator } from "components";
import BudgetCategoryList from "pages/Budget/components/BudgetCategoryList";
function Budget({
  commonState,
  budgetState,
  fetchBudget,
  fetchBudgetCategories,
  fetchAllCategories,
}) {
  useEffect(() => {
    fetchBudget(1);
    fetchBudgetCategories(1);
    fetchAllCategories();
  }, [fetchBudget, fetchBudgetCategories, fetchAllCategories]);

  const isLoaded = useMemo(
    () =>
      !!commonState &&
      Object.keys(commonState).length === 0 &&
      !!budgetState &&
      Object.keys(budgetState).length === 0,
    [commonState, budgetState]
  );
  return (
    <Grid>
      <section>
        {isLoaded ? (
          <BudgetCategoryList></BudgetCategoryList>
        ) : (
          <LoadingIndicator></LoadingIndicator>
        )}
      </section>
      <section>
        {isLoaded ? "transactionList" : <LoadingIndicator></LoadingIndicator>}
      </section>
    </Grid>
  );
}

export default connect(
  (state) => {
    return {
      budget: state.budget.budget,
      commonState: state.common.loadingState,
      budgetState: state.budget.loadingState,
    };
  },
  {
    fetchBudget,
    fetchBudgetCategories,
    fetchAllCategories,
  }
)(Budget);
