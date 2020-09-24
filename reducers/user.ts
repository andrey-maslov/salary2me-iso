import {
    ADD_AUTH_DATA,
    CLEAR_USER_DATA,
} from '../actions/actionTypes'
import {loadState} from '../store/sessionStorage'
import {isBrowser} from "../helper/helper"

let STATE = isBrowser ? loadState('user') : null

export type userStoreType = {
    name: string,
    email: string,
    isLoggedIn: boolean,
    provider: string,
    isSubscribed: boolean,
    isPublic: boolean,
    isLookingForJob: boolean
}

if (!STATE) {
    STATE = {
        name: '',
        email: '@mail',
        isLoggedIn: true,
        provider: '',
        isSubscribed: false,
        isPublic: false,
        isLookingForJob: false
    }
}

export const user = (state = STATE, {
    type,
    name,
    email,
    isLoggedIn,
    provider,
    isPublic,
    isLookingForJob
}) => {
    switch (type) {

        case ADD_AUTH_DATA :
            return {
                ...state,
                name,
                email,
                isLoggedIn: true,
                provider,
                isPublic,
                isLookingForJob
            }
        case CLEAR_USER_DATA :
            return {
                ...state,
                name: '',
                email: '',
                isLoggedIn: false,
                provider: '',
                isPublic: false,
                isLookingForJob: false
            }
        default:
            return state
    }
}