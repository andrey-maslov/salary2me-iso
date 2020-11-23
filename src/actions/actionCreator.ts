import axios from 'axios'
import {
    ADD_USER_SALARY,
    ADD_AUTH_DATA,
    OPEN_LOGIN_MODAL,
    CV_SENT,
    ESTIMATION,
    CLEAR_USER_DATA,
    GET_CURRENCY_RATES,
    LOADING,
    SAVE_TEST_DATA,
    FETCH_TEST_DESC,
    FETCH_TERMS,
    SAVE_PERSONAL_INFO,
    CHANGE_PWD,
    SET_TOAST,
    SEND_EMAIL, SET_AUTH_PROVIDER
} from './actionTypes'
import { ISignInData, ISignUpData } from '../typings/types'
import { authModes } from '../constants/constants'
import { setCookie, removeCookie, getCookieFromBrowser } from '../helper/cookie'
import { apiErrorHandling, accountApiErrorHandling, clearErrors } from './errorHandling'

const apiVer = process.env.API_VER

/*= ==== AUTH ===== */

export interface IUserData {
    firstName: string
    lastName: string
    email: string
    position?: string
    provider?: string
    isPublicProfile?: boolean
    isOpenForWork?: boolean
}

export function setUserData(data: IUserData): { type: string; userData: IUserData } {
    return {
        type: ADD_AUTH_DATA,
        userData: {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            position: data.position,
            provider: data.provider,
            isPublicProfile: data.isPublicProfile,
            isOpenForWork: data.isOpenForWork
        }
    }
}

export function checkAuth(jwt?: string): unknown {
    const url = `${process.env.BASE_API}/api/v${apiVer}/Account`
    const token = jwt || getCookieFromBrowser('token')
    return (dispatch: any) => {
        if (token) {
            dispatch(setLoading(true))
            axios(url, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(res => {})
                .catch(error => apiErrorHandling(error, dispatch))
                .finally(() => dispatch(setLoading(false)))
        } else {
            dispatch({ type: CLEAR_USER_DATA })
        }
    }
}

export function authUser(
    userData: ISignUpData | ISignInData,
    authType: keyof typeof authModes,
    setError: unknown
): unknown {
    const url = `${process.env.BASE_API}/api/v${apiVer}/Account/${
        authType === authModes[1] ? 'register' : 'authenticate'
    }`

    return dispatch => {
        axios
            .post(url, userData)
            .then(res => {
                const token = res.data.jwtToken
                setCookie('token', token)
                dispatch({ type: SET_AUTH_PROVIDER, provider: 'local' })
                dispatch(fetchUserData(token))
            })
            .catch(error => accountApiErrorHandling(error, setError))
    }
}

export function fetchUserData(token: string) {
    const url = `${process.env.BASE_API}/api/v${apiVer}/Account`
    return dispatch => {
        axios
            .get(url, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(res => {
                dispatch(setUserData(res.data))
            })
            .catch(error => console.error(error))
    }
}

export const updateUserData = (userData: IUserData) => {
    const url = `${process.env.BASE_API}/api/v${apiVer}/Account/update`
    const token = getCookieFromBrowser('token')
    return dispatch => {
        if (token) {
            clearErrors(dispatch)
            axios
                .put(url, userData, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                .then(res => {
                    dispatch(setUserData(res.data))
                    dispatch({ type: SET_TOAST, setToast: 1 })
                })
                .catch(error => {
                    apiErrorHandling(error, dispatch)
                    dispatch({ type: SET_TOAST, setToast: 2 })
                })
        } else {
            dispatch({ type: CLEAR_USER_DATA })
        }
    }
}

export const sendForgotEmail = (email: string, setError: unknown): unknown => {
    const url = `${process.env.BASE_API}/api/v${apiVer}/Account/reset-password`

    return dispatch => {
        axios
            .post(url, { email })
            .then(() => dispatch({ type: SEND_EMAIL, isEmailSent: true }))
            .catch(error => accountApiErrorHandling(error, setError))
    }
}

interface INewPwdData {
    code: string
    newPassword: string
    email: string
}

export const sendNewPassword = (data: INewPwdData, setError: unknown): unknown => {
    const url = `${process.env.BASE_API}/api/v${apiVer}/Account/confirm-reset-password`

    return dispatch => {
        axios
            .post(url, data)
            .then(() => dispatch({ type: CHANGE_PWD, isPwdChanged: true }))
            .catch(error => accountApiErrorHandling(error, setError))
    }
}

export function logOut(): { type: string } {
    removeCookie('token')
    return { type: CLEAR_USER_DATA }
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
    auth2.signOut().then(function() {
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
