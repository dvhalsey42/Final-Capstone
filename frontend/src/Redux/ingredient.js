import * as ActionTypes from "./actionTypes";

export const Ingredient = (
  state = {
    id: null,
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
      return state.filter(ingredient => ingredient.ingredient_name !== action.payload.ingredient_name);

    default:
      return state;
  }
};
