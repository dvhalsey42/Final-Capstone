import * as ActionTypes from "./actionTypes";

export const Pantry = (
  state = {
    pantry_id: "",
    ingredient_id: "",
    ingredients: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_INGREDIENT_TO_PANTRY:
      return {
        ...state,
        ingredient_id: action.payload.ingredient_id,
      };

    // UNSURE OF OBJECT FORMAT
    case ActionTypes.FETCH_PANTRY_INGREDIENTS:
      return {
        ...state,
        ingredients: action.payload,
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
