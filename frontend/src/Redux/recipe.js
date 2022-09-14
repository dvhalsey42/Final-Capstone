import * as ActionTypes from "./actionTypes";

export const Recipe = (
  state = {
    id: "",
    recipe_name: "",
    instructions_list: "",
    ingredients: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.CREATE_RECIPE:
      console.log(action.payload);
      return {
        ...state,
        recipe_name: action.payload.recipe_name,
        instructions_list: action.payload.instructions_list,
        ingredients: action.payload.ingredients,
      };

    case ActionTypes.ADD_INGREDIENT_TO_RECIPE:
      return {
        ...state,
        ingredients: [...this.state.ingredients, action.payload.ingredients],
      };

    // UNSURE OF COMBINING INGREDIENTS IN OBJECT
    case ActionTypes.EDIT_MY_RECIPE:
      return {
        ...state,
        recipe_name: action.payload.recipe_name,
        instructions_list: action.payload.instructions_list,
      };

    case ActionTypes.DELETE_RECIPE:
      return {
        ...state,
        recipe_name: "",
        instructions_list: "",
      };

    default:
      return state;
  }
};
