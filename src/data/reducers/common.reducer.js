import {
  LOADING_STATES,
  ALL_CATEGORIES_GET,
  ALL_CATEGORIES_GET_REQUEST,
  ALL_CATEGORIES_GET_SUCCESS,
  ALL_CATEGORIES_GET_FAILURE,
} from "data/constants";

const initialState = {
  loadingState: {},
  allCategories: [],
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
    case ALL_CATEGORIES_GET_REQUEST:
      return {
        ...state,
        loadingState: {
          ...state.loadingState,
          [action.type]: LOADING_STATES.LOADING,
        },
      };
    case ALL_CATEGORIES_GET_SUCCESS:
      delete newLoadingState.ALL_CATEGORIES_GET_REQUEST;
      return {
        ...state,
        allCategories: action.payload,
        loadingState: newLoadingState,
      };
    case ALL_CATEGORIES_GET_FAILURE:
      delete newLoadingState.ALL_CATEGORIES_GET_REQUEST;
      return {
        ...state,
        allCategories: {},
        loadingState: newLoadingState,
      };
    default:
      return state;
  }
}

export default budget;
