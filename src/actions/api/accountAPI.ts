import axios from 'axios'
import { AuthData, AuthType, IChangeEmail, IEmailConfirmation, INewPwdData, IUserData } from '../../typings/types'
import { authModes, SERVICE } from '../../constants/constants'
import { getCookieFromBrowser, setCookie } from '../../helper/cookie'
import {
    CHANGE_PWD,
    CLEAR_USER_DATA,
    DANGER_MODAL, EMAIL_CONFIRMATION,
    SEND_EMAIL,
    SET_AUTH_PROVIDER,
    SET_TOAST
} from '../actionTypes'
import { accountApiErrorHandling, apiErrorHandling, clearErrors } from '../errorHandling'
import { logOut, setUserData, fetchTestData, setLoading } from '../actionCreator'
import { accountApiUrl, getAuthConfig } from './utils'
import { fetchUsersBillingData } from "./subscriptionsAPI";

export function checkAuth(jwt?: string): unknown {
    const token = jwt || getCookieFromBrowser('token')
    return dispatch => {
        dispatch(fetchUserData(token))
    }
}

export function authUser(userData: AuthData, authType: AuthType, setError: unknown): unknown {
    const url = `${accountApiUrl}/${authType === authModes[1] ? 'register' : 'authenticate'}`

    return dispatch => {
        axios
            .post(url, userData)
            .then(res => {
                const token = res.data.jwtToken
                setCookie('token', token)
                dispatch({ type: SET_AUTH_PROVIDER, provider: 'local' })
                dispatch(fetchUserData(token))
                dispatch(fetchTestData(token))
            })
            .catch(error => accountApiErrorHandling(error, setError))
    }
}

export function fetchUserData(token: string): unknown {
    return dispatch => {
        if (token) {
            axios
                .get(accountApiUrl, getAuthConfig(token))
                .then(res => {
                    dispatch(setUserData(res.data))
                    dispatch(fetchTestData(token))
                })
                .catch(error => console.error(error))
        } else {
            dispatch({ type: CLEAR_USER_DATA })
        }
    }
}

export const updateUserData = (userData: IUserData) => {
    const token = getCookieFromBrowser('token')
    return (dispatch, getState) => {
        if (token) {
            clearErrors(dispatch)
            const data = { ...getState().user, ...userData }
            axios
                .put(`${accountApiUrl}/update`, data, getAuthConfig(token))
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

export const changeEmail = ({ email }) => {
    const token = getCookieFromBrowser('token')
    return (dispatch, getState) => {
        if (token) {
            clearErrors(dispatch)
            axios
                .post(
                    `${accountApiUrl}/change-email`,
                    { newEmail: email, service: SERVICE },
                    getAuthConfig(token)
                )
                .then(res => {
                    dispatch({ type: SEND_EMAIL, isEmailSent: true })
                    dispatch(setUserData({ ...getState().user, email }))
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
    return dispatch => {
        axios
            .post(`${accountApiUrl}/reset-password`, { email, service: 4 })
            .then(() => dispatch({ type: SEND_EMAIL, isEmailSent: true }))
            .catch(error => accountApiErrorHandling(error, setError))
    }
}

export const sendNewPassword = (data: INewPwdData, setError: unknown): unknown => {
    return dispatch => {
        axios
            .post(`${accountApiUrl}/confirm-reset-password`, data)
            .then(() => dispatch({ type: CHANGE_PWD, isPwdChanged: true }))
            .catch(error => accountApiErrorHandling(error, setError))
    }
}

export const sendEmailConfirmation = (data: IEmailConfirmation) => {
    const token = getCookieFromBrowser('token')
    return (dispatch, getState) => {
        if (token) {
            dispatch(setLoading(true))
            console.log(getState().user)
            axios
                .post(
                    `${accountApiUrl}/confirm-email-change`,
                    data,
                    getAuthConfig(token)
                )
                .then(res => {
                    dispatch(setUserData(res.data))
                    dispatch({ type: SET_TOAST, setToast: 1 })
                    dispatch({ type: EMAIL_CONFIRMATION, isEmailConfirmed: true })
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

export function deleteAccount(password: string): unknown {
    const token = getCookieFromBrowser('token')
    return dispatch => {
        if (token) {
            axios
                .post(`${accountApiUrl}/delete`, { password }, getAuthConfig(token))
                .then(() => {
                    dispatch(logOut())
                    dispatch({ type: DANGER_MODAL, isDangerModal: false })
                })
                .catch(error => apiErrorHandling(error, dispatch))
        } else {
            dispatch({ type: CLEAR_USER_DATA })
        }
    }
}
