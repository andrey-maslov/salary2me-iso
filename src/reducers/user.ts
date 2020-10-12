import { ADD_AUTH_DATA, CHANGE_PWD, CLEAR_USER_DATA, SEND_EMAIL } from '../actions/actionTypes'
import { loadState } from '../store/sessionStorage'
import { isBrowser } from '../helper/helper'

let STATE = isBrowser ? loadState('user') : null

export type userStoreType = {
    firstName: string | null
    lastName: string | null
    email: string | null
    position: string | null
    provider: string | null
    isLoggedIn: boolean
    isEmailSent: boolean | null
    isPwdChanged: boolean | null
    isSubscribed: boolean | null
    isPublic: boolean | null
    isLookingForJob: boolean | null
}

if (!STATE) {
    STATE = {
        firstName: null,
        lastName: null,
        email: null,
        position: null,
        provider: null,
        isLoggedIn: false,
        isEmailSent: null,
        isPwdChanged: null,
        isSubscribed: null,
        isPublic: null,
        isLookingForJob: null
    }
}

export const user = (state = STATE, { type, userData, isEmailSent, isPwdChanged }) => {
    switch (type) {
        case ADD_AUTH_DATA:
            return {
                ...state,
                ...userData,
                isLoggedIn: true
            }
        case SEND_EMAIL:
            return {
                ...state,
                isEmailSent
            }
        case CHANGE_PWD:
            return {
                ...state,
                isPwdChanged
            }
        case CLEAR_USER_DATA:
            return {
                ...state,
                firstName: null,
                lastName: null,
                email: null,
                provider: null,
                isLoggedIn: null,
                isPublic: null,
                isLookingForJob: null
            }
        default:
            return state
    }
}
