import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import {Token} from './token'
import {User} from './user'
import { Ingredient } from './ingredient'
import { Ingredients } from './ingredients'
import {Recipe} from './recipe'
import { PantryIngredient } from './pantry_ingredient'
import { Meal } from './meal'
import { Recipes } from './recipes'

export const ConfigureStore = () => {
    const store = createStore(
      combineReducers({
        token: Token,
        user: User,
        ingredient: Ingredient,
        ingredients: Ingredients,
        recipe: Recipe,
        recipes: Recipes,
        pantry_ingredient: PantryIngredient,
        meal: Meal,
      }),
      compose(
        applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
          window.__REDUX_DEVTOOLS_EXTENSION__({trace: true, traceLimit: 25})
      )
    );

    return store;
}