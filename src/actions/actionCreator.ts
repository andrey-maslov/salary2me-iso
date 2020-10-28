import axios from 'axios'
import {
    ADD_USER_SALARY,
    ADD_AUTH_DATA,
    OPEN_LOGIN_MODAL,
    CV_SENT,
    ESTIMATION,
    CLEAR_USER_DATA,
    GET_CURRENCY_RATES,
    SET_ERROR,
    PROCESS_FAILED,
    LOADING,
    SAVE_TEST_DATA,
    FETCH_TEST_DESC,
    FETCH_TERMS,
    SAVE_PERSONAL_INFO,
    CHANGE_PWD,
    SET_TOAST, CLEAR_TEST_DATA, CLEAR_CV_DATA
} from './actionTypes'
import { ISignInData, ISignUpData } from '../typings/types'
import { authModes } from '../constants/constants'
import { setCookie, removeCookie, getCookieFromBrowser } from '../helper/cookie'

/*= ==== AUTH ===== */

export interface IUserData {
    firstName?: string
    lastName?: string
    email?: string
    position?: string
    provider?: string
    isPublic?: boolean
    isLookingForJob?: boolean
}

export function addAuthData(data: IUserData): { type: string; userData: IUserData } {
    return {
        type: ADD_AUTH_DATA,
        userData: {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            position: data.position,
            provider: data.provider,
            isPublic: data.isPublic,
            isLookingForJob: data.isLookingForJob
        }
    }
}

export function checkAuth(jwt?) {
    const url = `${process.env.BASE_API}/api/v${process.env.API_VER}/Account`
    const token = jwt || getCookieFromBrowser('token')
    return (dispatch: any) => {
        if (token) {
            dispatch(setLoading(true))
            axios(url, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(res => res.data)
                .then(data => {
                    dispatch(
                        addAuthData({
                            ...data,
                            email: data.username
                        })
                    )
                })
                .catch(error => apiErrorHandling(error, dispatch))
                .finally(() => dispatch(setLoading(false)))
        } else {
            dispatch({ type: CLEAR_USER_DATA })
        }
    }
}

export const authUser = (userData: ISignUpData | ISignInData, authType: keyof typeof authModes) => {
    const url = `${process.env.BASE_API}/api/v${process.env.API_VER}/Account/${
        authType === authModes[1] ? 'register' : 'authenticate'
    }`

    return (dispatch: any) => {
        dispatch(setLoading(true))
        axios
            .post(url, {
                data: userData
            })
            .then(res => res.data)
            .then(data => {
                dispatch(
                    addAuthData({
                        ...data,
                        email: data.username
                    })
                )
                setCookie('token', data.jwtToken)
                // dispatch({ type: CLEAR_TEST_DATA })
                // dispatch({ type: CLEAR_CV_DATA })
                dispatch(clearErrors())
            })
            .catch(error => {
                apiErrorHandling(error, dispatch)
            })
            .finally(() => dispatch(setLoading(false)))
    }
}

export const updateUserData = (userData: any) => {
    // for (const prop in userData) {
    //     if (typeof prop === 'string') {
    //         userData[prop] = sanitize(userData[prop].trim())
    //     }
    // }

    const url = `${process.env.BASE_API}/api/v${process.env.API_VER}/Account/update`
    const token = getCookieFromBrowser('token')
    return (dispatch: any) => {
        if (token) {
            dispatch(setLoading(true))
            dispatch(clearErrors())

            axios
                .put(url, {
                    data: userData
                })
                .then(res => {
                    dispatch(addAuthData(userData))
                    dispatch({ type: SET_TOAST, setToast: 1 })
                })
                .catch(error => {
                    apiErrorHandling(error, dispatch)
                    dispatch({ type: SET_TOAST, setToast: 2 })
                })
                .finally(() => dispatch(setLoading(false)))
        } else {
            dispatch({ type: CLEAR_USER_DATA })
        }
    }
}

export const sendForgotEmail = (email: string) => {
    const url = `${process.env.BASE_API}/api/v${process.env.API_VER}/Account/reset-password`

    return (dispatch: any) => {
        dispatch(setLoading(true))
        axios
            .post(url, {
                data: { email }
            })
            .then(res => res.data)
            .then(data => {
                console.log('OK')
                // dispatch(clearErrors())
                // dispatch({type: SEND_EMAIL, emailSent: true})
            })
            .catch(error => {
                console.log('ERROR email')
                apiErrorHandling(error, dispatch)
            })
            .finally(() => dispatch(setLoading(false)))
    }
}

export const sendNewPassword = (data: { code: string; newPassword: string; email: string }) => {
    const url = `${process.env.BASE_API}/api/v${process.env.API_VER}/Account/confirm-reset-password`

    return (dispatch: any) => {
        dispatch(setLoading(true))
        axios
            .post(url, {
                data
            })
            .then(() => {
                dispatch(clearErrors())
                dispatch({ type: CHANGE_PWD, isPwdChanged: true })
            })
            .catch(error => {
                apiErrorHandling(error, dispatch)
            })
            .finally(() => dispatch(setLoading(false)))
    }
}

export function logOut(): { type: string } {
    removeCookie('token')
    return {
        type: CLEAR_USER_DATA
    }
}

// TODO change
export const signInGoogle = () => {
    return dispatch => {
        // @ts-ignore
        const auth2 = window.gapi.auth2.getAuthInstance()
        auth2
            .signIn()
            .then(googleUser => {
                const profile = googleUser.getBasicProfile()
                return profile
            })
            .then(profile => {
                const name = profile.getName()
                const email = profile.getEmail()
                // dispatch(addAuthData(name, email, 'google'));
                // dispatch(isUserInBase(email));
            })
    }
}
// TODO change
export const signOutGoogle = () => {
    // @ts-ignore
    const auth2 = window.gapi.auth2.getAuthInstance()
    auth2.signOut().then(function () {
        console.log('User signed out.')
    })
}
// TODO change, maybe we don't need it
export const setLoginModal = bool => ({
    type: OPEN_LOGIN_MODAL,
    isLoginModalOpen: bool
})

/*= ==== SALARY ESTIMATION ===== */

export const setCvSent = bool => ({
    type: CV_SENT,
    isCvSent: bool
})

export const sendCvForResults = formData => {
    return dispatch => {
        dispatch({ type: LOADING, loading: true })

        axios
            .post(`${process.env.BASE_API}/api/Predict`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(res => {
                dispatch({
                    type: ESTIMATION,
                    predictions: res.data.predictions,
                    position: res.data.position
                })
                dispatch(setCvSent(true))
            })
            .catch(error => {
                apiErrorHandling(error, dispatch)
            })
            .finally(() => {
                dispatch({ type: LOADING, loading: false })
            })
    }
}

// Send real user salary to base
export const sendRealSalary = formData => {
    return dispatch => {
        dispatch({ type: LOADING, loading: true })
        axios
            .put(`${process.env.BASE_API}/api/Predict`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(() => {
                dispatch({ type: ADD_USER_SALARY, realSalary: formData.get('salary') })
            })
            .catch(err => {
                apiErrorHandling(err, dispatch)
            })
            .finally(() => dispatch({ type: LOADING, loading: true }))
    }
}

/*= ==== TEST ===== */

export const savePersonalInfo = (personalInfo: number[]) => {
    return {
        type: SAVE_PERSONAL_INFO,
        personalInfo
    }
}

export const saveTestData = (testData: number[][]) => {
    return {
        type: SAVE_TEST_DATA,
        testData
    }
}

export const fetchTerms = (lang: string) => {
    const url = `${process.env.CONTENT_API}/psychologies/1`

    return (dispatch: any) => {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                // console.log(data)
                dispatch({
                    type: FETCH_TERMS,
                    terms: data[`content_${lang}`]
                })
            })
    }
}

export const fetchContent = (lang: string) => {
    const url = `${process.env.CONTENT_API}/psychologies/2`

    return (dispatch: any) => {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                dispatch({
                    type: FETCH_TEST_DESC,
                    descriptions: data[`content_${lang}`]
                })
            })
    }
}

/*= ==== APIs ===== */

export const getCurrencyRates = () => {
    return dispatch => {
        axios('https://api.exchangeratesapi.io/latest?base=USD&symbols=USD,EUR,GBP')
            .then(response => {
                return response.data.rates
            })
            .then(rates => {
                dispatch({
                    type: GET_CURRENCY_RATES,
                    currencyRates: rates
                })
            })
            .catch(error => {
                console.error(error)
            })
    }
}

/*= ==== APPLICATION MODE (app reducer) ===== */

export function setLoading(isLoading: boolean) {
    return {
        type: LOADING,
        isLoading
    }
}

/*= ==== UTILS ===== */

export function clearErrors() {
    return (dispatch: any) => {
        dispatch({ type: SET_ERROR, apiErrorMsg: null })
        dispatch({ type: PROCESS_FAILED, processFailed: false })
    }
}

function apiErrorHandling(error: any, dispatch: any) {
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