import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import {Token} from './token'
import {User} from './user'
import { Ingredient } from './ingredient'
import { Ingredients } from './ingredients'
import {Recipe} from './recipe'
import { Pantry } from './pantry'
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
        pantry: Pantry,
        meal: Meal,
      }),
      compose(
        applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
          window.__REDUX_DEVTOOLS_EXTENSION__()
      )
    );

    return store;
}