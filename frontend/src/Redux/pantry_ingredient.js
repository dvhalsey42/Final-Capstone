import * as ActionTypes from "./actionTypes";

export const PantryIngredient = (
  state = {
    pantry_id: "",
    ingredient_id: "",
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_PANTRY_INGREDIENT:
      return {
        ...state,
        ingredient_id: action.payload.ingredient_id,
      };

    // UNSURE OF OBJECT FORMAT
    case ActionTypes.FETCH_PANTRY_INGREDIENTS:
      return {
        ...state,
        pantry_ingredients: action.payload.pantry_ingredients,
      };

    case ActionTypes.DELETE_PANTRY_INGREDIENT:
      return {
        pantry_id: "",
        ingredient_id: "",
      };

    default:
      return state;
  }
};
