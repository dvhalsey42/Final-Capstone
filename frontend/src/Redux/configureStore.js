import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import {Token} from './token'
import {User} from './user'
import { Ingredient } from './ingredient'
import { Ingredients } from './ingredients'
import {Recipe} from './recipe'

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            token: Token,
            user: User,
            ingredient: Ingredient,
            ingredients: Ingredients,
            recipe: Recipe,   
        }),
        applyMiddleware(thunk)
    );

    return store;
}