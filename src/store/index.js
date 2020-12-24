import { useMemo } from 'react'
import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'
import { saveState } from './sessionStorage'

let store

/* eslint-disable no-underscore-dangle */
const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose

/* eslint-enable */

function initStore(preloadedState) {
    return (
        createStore(
            rootReducer,
            preloadedState,
            composeEnhancers(
                applyMiddleware(
                    thunk
                )
            ),
        )
    )
}

export const initializeStore = preloadedState => {
    let _store = store ?? initStore(preloadedState)

    // After navigating to a page with an initial Redux state, merge that state
    // with the current state in the store, and create a new store
    if (preloadedState && store) {
        _store = initStore({
            ...store.getState(),
            ...preloadedState
        })
        // Reset the current store
        store = undefined
    }

    // For SSG and SSR always create a new store
    if (typeof window === 'undefined') return _store
    // Create the store once in the client
    if (!store) store = _store

    return _store
}

const myStore = initializeStore()

myStore.subscribe(() => {
    // saveState('test', myStore.getState().test)
    // saveState('user', myStore.getState().user)
    // saveState('cv', myStore.getState().cv)
})

export function useStore(initialState) {
    const memoizedStore = useMemo(() => initializeStore(initialState), [initialState])
    return memoizedStore
}
