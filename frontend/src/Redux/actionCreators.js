import Ingredientlist from "../Components/Pantry/Pantry";
import * as ActionTypes from "./actionTypes";
import { Ingredient } from "./ingredient";


export const addToken = (token) => ({
  type: ActionTypes.ADD_TOKEN,
  payload: token,
});

export const addUser = (user) => ({
  type: ActionTypes.ADD_USER,
  payload: user,
});

export const deleteUser = () => ({
  type: ActionTypes.DELETE_USER,
});

export const addIngredient = (ingredient) => ({
  type: ActionTypes.ADD_INGREDIENT,
payload: ingredient,
});

export const fetchIngredients = (ingredients) => ({
  type: ActionTypes.FETCH_INGREDIENTS_SUCCESS,
  payload: ingredients,
});

export const deleteIngredient = (ingredient) => ({
  type: ActionTypes.DELETE_INGREDIENT,
  payload: this.ingredient_name,
});

export const createRecipe = (recipe) => ({
  type: ActionTypes.CREATE_RECIPE,
  payload: recipe,
});

export const createMeal = (meal) => ({
  type: ActionTypes.CREATE_MEAL,
  payload: meal,
})


