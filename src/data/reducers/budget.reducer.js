import {
  LOADING_STATES,
  BUDGET_GET_REQUEST,
  BUDGET_GET_SUCCESS,
  BUDGET_GET_FAILURE,
  BUDGETED_CATEGORIES_GET_REQUEST,
  BUDGETED_CATEGORIES_GET_SUCCESS,
  BUDGETED_CATEGORIES_GET_FAILURE,
  SET_SELECTED_PARENT_CATEGORY_ID,
  BUDGET_TRANSACTION_ADD_REQUEST,
  BUDGET_TRANSACTION_ADD_SUCCESS,
  BUDGET_TRANSACTION_ADD_FAILURE,
} from "data/constants";

const initialState = {
  loadingState: null,
  budget: {},
  budgetCategories: [],
  selectedParentCategoryId: undefined,
};

// action = {
//     type: 'BUDGET_FETCHED',
//     payload:{
//         id:1,
//     }
// }

function budget(state = initialState, action) {
  const newLoadingState = { ...state.loadingState };

  switch (action.type) {
    case BUDGET_GET_REQUEST:
      return {
        ...state,
        loadingState: {
          ...state.loadingState,
          [action.type]: LOADING_STATES.LOADING,
        },
      };
    case BUDGET_GET_SUCCESS:
      delete newLoadingState.BUDGET_GET_REQUEST;
      return {
        ...state,
        budget: action.payload,
        loadingState: newLoadingState,
      };
    case BUDGET_GET_FAILURE:
      delete newLoadingState.BUDGET_GET_REQUEST;
      return {
        ...state,
        budget: {},
        loadingState: newLoadingState,
      };
    case BUDGETED_CATEGORIES_GET_REQUEST:
      return {
        ...state,
        loadingState: {
          ...state.loadingState,
          [action.type]: LOADING_STATES.LOADING,
        },
      };
    case BUDGETED_CATEGORIES_GET_SUCCESS:
      delete newLoadingState.BUDGETED_CATEGORIES_GET_REQUEST;
      return {
        ...state,
        budgetCategories: action.payload,
        loadingState: newLoadingState,
      };
    case BUDGETED_CATEGORIES_GET_FAILURE:
      delete newLoadingState.BUDGETED_CATEGORIES_GET_REQUEST;
      return {
        ...state,
        budgetedCategories: [],
        loadingState: newLoadingState,
      };
    case SET_SELECTED_PARENT_CATEGORY_ID:
      return {
        ...state,
        selectedParentCategoryId: action.payload,
      };
    case BUDGET_TRANSACTION_ADD_SUCCESS:
      delete newLoadingState.BUDGET_GET_REQUEST;

      return {
        ...state,
        loadingState: newLoadingState,
        budget: {
          ...state.budget,
          transactions: [action.payload, ...state.budget.transactions],
        },
      };
    case BUDGET_TRANSACTION_ADD_FAILURE:
      delete newLoadingState.BUDGET_GET_REQUEST;

      return {
        ...state,
        loadingState: newLoadingState,
      };
    default:
      return state;
  }
}

export default budget;
