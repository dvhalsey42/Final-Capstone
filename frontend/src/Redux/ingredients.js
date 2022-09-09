import * as ActionTypes from "./actionTypes";

export const Ingredients = (
  state = {
    ingredients: [],
    loading: false,
    error: null,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.FETCH_INGREDIENTS_START:
        return {
            ...state,
            loading: true,
        };
    case ActionTypes.FETCH_INGREDIENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        ingredients: action.payload,
      };
      case ActionTypes.FETCH_INGREDIENTS_ERROR:
        return {
            ...state,
            loading: false,
            error: action.payload,
        }
    default:
      return state;
  }
};
