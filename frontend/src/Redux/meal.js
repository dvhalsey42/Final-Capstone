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

      case ActionTypes.EDIT_MEAL:
        return {
          ...state,
          meal_name: action.payload.recipe_name,
        };

        case ActionTypes.DELETE_MEAL:
          return {
            ...state,
            meal_name: "",
          };

          // JOIN TABLE LOGIC NEEDED HERE
          case ActionTypes.DELETE_RECIPE_IN_MEAL:
            return {
              ...state,
              // meal_recipes: 
            }

    default:
      return state;
  }
};
