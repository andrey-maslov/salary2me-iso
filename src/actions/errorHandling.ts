import { PROCESS_FAILED, SET_AUTH_ERROR, SET_ERROR } from "./actionTypes";

export function clearErrors(dispatch) {
    console.log('from clear')
    dispatch({ type: SET_ERROR, apiErrorMsg: null })
    dispatch({ type: PROCESS_FAILED, processFailed: false })
    dispatch({ type: SET_AUTH_ERROR, authApiErrorMsg: null })

}

export function apiErrorHandling(error: any, dispatch: any) {
    if (error.response) {
        const msg: string = error.response.data?.title || 'Something wrong with resources'
        dispatch({
            type: SET_ERROR,
            apiErrorMsg: msg
        })
    } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        const msg = 'Some troubles with network'
        dispatch({
            type: SET_ERROR,
            apiErrorMsg: msg
        })
    } else {
        // Something happened in setting up the request that triggered an Error
        console.error('ERROR', error.message)
    }
    dispatch({ type: PROCESS_FAILED, processFailed: true })
}

export function authApiErrorHandling(error: any, dispatch: any) {
    if (error.response) {
        const { title, status, detail, errors } = error.response.data
        // console.log(title, status, detail, errors)
        if (status === 404) {
            dispatch({ type: SET_AUTH_ERROR, authApiErrorMsg: `User not found` })
        }
        if (status === 500) {
            dispatch({ type: SET_AUTH_ERROR, authApiErrorMsg: `Something wrong` })
        }
        if (errors) {
            const { password, email } = errors

            if (password) {
                setSpecificError(password, dispatch)
            } else if (email) {
                setSpecificError(email, dispatch)
            } else {
                dispatch({ type: SET_AUTH_ERROR, authApiErrorMsg: `Something wrong` })
            }
        }
    } else {
        dispatch({ type: SET_AUTH_ERROR, authApiErrorMsg: `Something wrong` })
    }
}

function setSpecificError(errorList: string[], dispatch): void {
    if (!Array.isArray(errorList)) {
        dispatch({ type: SET_AUTH_ERROR, authApiErrorMsg: `Something wrong` })
    }
    const msg = errorList.length > 1 ? errorList.join(', ') : errorList[0]
    dispatch({ type: SET_AUTH_ERROR, authApiErrorMsg: msg })
}
