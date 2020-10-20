import { LOADING, PROCESS_FAILED, REDIRECT_URL, SET_TOAST, SET_ERROR } from '../actions/actionTypes'

export type appStoreType = {
    isLoading: boolean
    apiErrorMsg: string | null
    processFailed: boolean
    setToast: number
    isPwdChanged: false
    redirectUrl: string | null
}

const STATE = {
    isLoading: false,
    apiErrorMsg: null,
    processFailed: false,
    setToast: 0,
    redirectUrl: null
}

/**
 *
 * @param state
 * @param type
 * @param sorting
 * @param apiErrorMsg
 * @param processFailed
 * @param setToast {0 - default, 1 - success, 2 - fail}
 * @param redirectUrl
 */

export const app = (
    state = STATE,
    { type, isLoading, apiErrorMsg, processFailed, setToast, redirectUrl }
) => {
    switch (type) {
        case LOADING:
            return {
                ...state,
                isLoading
            }
        case SET_ERROR:
            return {
                ...state,
                apiErrorMsg
            }
        case PROCESS_FAILED:
            return {
                ...state,
                processFailed
            }
        case SET_TOAST:
            return {
                ...state,
                setToast
            }
        case REDIRECT_URL:
            return {
                ...state,
                redirectUrl
            }

        default:
            return state
    }
}
