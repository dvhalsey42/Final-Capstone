
import * as ActionTypes from "./actionTypes";


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

export const addPantryIngredient = (pantry_ingredient) => ({
  type: ActionTypes.ADD_PANTRY_INGREDIENT,
  payload: pantry_ingredient,
});

export const fetchPantryIngredients = (pantry_ingredients) => ({
  type: ActionTypes.FETCH_PANTRY_INGREDIENTS,
  payload: pantry_ingredients,
});

export const deletePantryIngredient = (pantry_ingredient) => ({
  type: ActionTypes.DELETE_INGREDIENT,
  payload: this.pantry_ingredient_name,
});

export const createRecipe = (recipe) => ({
  type: ActionTypes.CREATE_RECIPE,
  payload: recipe,
});

export const fetchRecipes = (recipes) => ({
  type: ActionTypes.FETCH_RECIPES,
  payload: recipes,
});

export const fetchMyRecipes = (my_recipes) => ({
  type: ActionTypes.FETCH_MY_RECIPES,
  payload: my_recipes,
});

export const editMyRecipe = (my_recipe) => ({
  type: ActionTypes.EDIT_MY_RECIPE,
  payload: my_recipe,
});

export const addIngredientToRecipe = (recipe) => ({
  type: ActionTypes.ADD_INGREDIENT_TO_RECIPE,
  payload: recipe,
});

export const deleteRecipe = (recipe) => ({
  type: ActionTypes.DELETE_RECIPE,
  payload: this.recipe.name,
})

export const createMeal = (meal) => ({
  type: ActionTypes.CREATE_MEAL,
  payload: meal,
});

export const fetchMeals = (meals) => ({
  type: ActionTypes.FETCH_MEALS,
  payload: meals,
});

export const editMeal = (meal) => ({
  type: ActionTypes.EDIT_MEAL,
  payload: meal,
});

export const deleteMeal = (meal) => ({
  type: ActionTypes.DELETE_MEAL,
  payload: meal,
});

export const deleteRecipeInMeal = (meal_recipe) => ({
  type: ActionTypes.DELETE_RECIPE_IN_MEAL,
  payload: meal_recipe,
});

export const createMealPlan = (mealplan) => ({
  type: ActionTypes.CREATE_MEALPLAN,
  payload: mealplan,
});

export const fetchMealPlans = (mealplans) => ({
  type: ActionTypes.FETCH_MEALPLANS,
  payload: mealplans,
});

export const editMealPlan = (mealplan) => ({
  type: ActionTypes.EDIT_MEAL_PLAN,
  payload: mealplan,
});

export const deleteMealPlan = (mealplan) => ({
  type: ActionTypes.DELETE_MEALPLAN,
  payload: mealplan,
});

export const fetchGroceryList = (grocery_list) => ({
  type: ActionTypes.FETCH_GROCERY_LIST,
  payload: grocery_list,
})






