import { combineReducers } from 'redux'
import { user } from './user'
import { modals } from './modals'
import { app } from './app'
import { test } from './test'
import { cv } from './cv'

const rootReducer = combineReducers({
    user,
    modals,
    app,
    test,
    cv
})

export default rootReducer