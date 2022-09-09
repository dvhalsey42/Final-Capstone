import * as ActionTypes from "./actionTypes";

export const Recipe = (
  state = {
    id: null,
    recipe_name: "",
    instructions_list: "",
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.CREATE_RECIPE:
      return {
        ...state,
        recipe_name: action.payload.recipe_name,
        instructions_list: action.payload.instructions_list,
      };

    default:
      return state;
  }
}
