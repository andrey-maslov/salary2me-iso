import { PROCESS_FAILED, SET_ERROR } from "./actionTypes";

export function clearErrors(dispatch) {
    dispatch({ type: SET_ERROR, apiErrorMsg: null })
    dispatch({ type: PROCESS_FAILED, processFailed: false })
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

export function authApiErrorHandling(error: any, setError) {
    if (error.response) {
        const { status, errors } = error.response.data
        if (status === 404) {
            setError('form', { message: 'User with this email not found' })
        }
        if (status === 500) {
            setError('form', { message: 'something wrong' })
        }
        if (errors) {
            const { password, email } = errors
            if (password) {
                setSpecificError(password, setError)
            } else if (email) {
                setSpecificError(email, setError)
            } else {
                setError('form', { message: 'something wrong' })
            }
        }
    } else {
        setError('form', { message: 'something wrong' })
    }
}

function setSpecificError(errorList: string[], setError): void {
    if (!Array.isArray(errorList)) {
        setError()
        setError('form', { message: 'something wrong' })
    }
    const msg = errorList.length > 1 ? errorList.join(', ') : errorList[0]
    setError('form', { message: msg })
}
