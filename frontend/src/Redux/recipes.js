import * as ActionTypes from "./actionTypes";

export const Recipes = (
  state = {
    recipes: [],
    loading: false,
    error: null,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.FETCH_MY_RECIPES:
      return {
        ...state,
        loading: false,
        recipes: action.payload,
      };
  
    default:
      return state;
  }
};
