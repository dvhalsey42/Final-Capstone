import * as ActionTypes from "./actionTypes";

export const Meals = (
  state = {
    meal_id: "",
    user_id: "",
    meal_name: "",
    recipes: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.FETCH_MEALS:
      return {
        ...state,
        recipes: action.payload,
      };
    default:
      return state;
  }
};
