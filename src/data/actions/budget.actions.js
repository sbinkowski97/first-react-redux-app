import API from "data/fetch";
import {
  BUDGET_GET,
  BUDGETED_CATEGORIES_GET,
  SET_SELECTED_PARENT_CATEGORY_ID,
} from "data/constants";

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

export const selectParentCategory = (id) => {
  return {
    type: SET_SELECTED_PARENT_CATEGORY_ID,
    payload: id,
  };
};
