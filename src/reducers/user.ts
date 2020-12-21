import { ADD_AUTH_DATA, CLEAR_USER_DATA, SET_AUTH_PROVIDER } from '../actions/actionTypes'
import { loadState } from '../store/sessionStorage'
import { isBrowser } from '../helper/helper'

// let STATE = isBrowser ? loadState('user') : null

export type userStoreType = {
    firstName: string
    lastName: string
    email: string
    position: string
    provider: string
    isLoggedIn: boolean
    isPublicProfile: boolean
    isOpenForWork: boolean
}

const STATE = {
    firstName: '',
    lastName: '',
    email: '',
    position: '',
    provider: '',
    isLoggedIn: false,
    isPublicProfile: false,
    isOpenForWork: false
}

export const user = (state = STATE, { type, userData, provider }) => {
    switch (type) {
        case ADD_AUTH_DATA:
            return {
                ...state,
                ...userData,
                isLoggedIn: true
            }
        case SET_AUTH_PROVIDER:
            return {
                ...state,
                provider
            }
        case CLEAR_USER_DATA:
            return {
                ...state,
                firstName: '',
                lastName: '',
                email: '',
                position: '',
                provider: '',
                isLoggedIn: false,
                isPublicProfile: false,
                isOpenForWork: false
            }
        default:
            return state
    }
}
