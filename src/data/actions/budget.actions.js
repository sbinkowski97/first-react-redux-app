import API from "data/fetch";
import { BUDGET_GET, BUDGETED_CATEGORIES_GET } from "data/constants";

export const fetchBudget = (id) => {
  const promise = API.budget.fetchBudget(id);

  return {
    type: BUDGET_GET,
    promise,
  };
};

export const fetchBudgetCategories = (id) => {
  const promise = API.budget.fetchBudgetedCategories(id);

  return {
    type: BUDGETED_CATEGORIES_GET,
    promise,
  };
};
