import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import {Token} from './token'
import {User} from './user'
import { Ingredient } from './ingredient'

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            token: Token,
            user: User,
            ingredient: Ingredient,
        }),
        applyMiddleware(thunk)
    );

    return store;
}