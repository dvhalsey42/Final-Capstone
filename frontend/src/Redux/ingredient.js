import * as ActionTypes from "./actionTypes";

export const Ingredient = (
  state = {
    id: null,
    ingredient_name: "",
    category: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_INGREDIENT:
      return {
        ...state,
        id: action.payload.id,
        ingredient_name: action.payload.username,
        category: action.payload.category,
      };

    case ActionTypes.DELETE_INGREDIENT:
      return { ...state, id: null, ingredient_name: "", category: [] };

    default:
      return state;
  }
};
