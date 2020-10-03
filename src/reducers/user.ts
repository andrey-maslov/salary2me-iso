import {
    ADD_AUTH_DATA, CHANGE_PWD,
    CLEAR_USER_DATA, SEND_EMAIL,
} from '../actions/actionTypes'
import {loadState} from '../store/sessionStorage'
import {isBrowser} from "../helper/helper"

let STATE = isBrowser ? loadState('user') : null

export type userStoreType = {
    firstName: string,
    lastName: string,
    email: string,
    position,
    isLoggedIn: boolean,
    provider: string,
    isEmailSent: boolean,
    isPwdChanged: boolean,
    isSubscribed: boolean,
    isPublic: boolean,
    isLookingForJob: boolean
}

if (!STATE) {
    STATE = {
        firstName: '',
        lastName: '',
        email: '@mail',
        position: '',
        isLoggedIn: true,
        isEmailSent: false,
        isPwdChanged: false,
        provider: '',
        isSubscribed: false,
        isPublic: false,
        isLookingForJob: false,
    }
}

export const user = (state = STATE, {
    type,
    userData,
    isEmailSent,
    isPwdChanged,
}) => {
    switch (type) {
        case ADD_AUTH_DATA :
            return {
                ...state,
                ...userData,
                isLoggedIn: true,
            }
        case SEND_EMAIL :
            return {
                ...state,
                isEmailSent
            }
        case CHANGE_PWD :
            return {
                ...state,
                isPwdChanged
            }
        case CLEAR_USER_DATA :
            return {
                ...state,
                firstName: '',
                LastName: '',
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