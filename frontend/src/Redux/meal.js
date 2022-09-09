import * as ActionTypes from "./actionTypes";

export const Meal = (
  state = {
    id: null,
    meal_name: "",
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.CREATE_MEAL:
      return {
        ...state,
        meal_name: action.payload.recipe_name,
      };

    default:
      return state;
  }
};
