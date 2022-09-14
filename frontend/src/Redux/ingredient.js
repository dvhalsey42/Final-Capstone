import * as ActionTypes from "./actionTypes";

export const Ingredient = (
  state = {
    id: "",
    ingredient_name: "",
    category: "",
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredient_name: action.payload.ingredient_name,
        category: action.payload.category,
      };

    case ActionTypes.DELETE_INGREDIENT:
      return { ...state, ingredient_name: "", category: "" };

    default:
      return state;
  }
};
