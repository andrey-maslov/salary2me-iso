import axios from 'axios'
import { getCookieFromBrowser } from '../../helper/cookie'
import { CLEAR_USER_DATA, ESTIMATION, LOADING, THANX_MODAL } from '../actionTypes'
import { apiErrorHandling } from '../errorHandling'
import { setCvSent } from '../actionCreator'
import { getAuthConfig, predictApiUrl } from './utils'
import { anyType, IResumeUpload } from '../../typings/types'

// get salary estimations from base by saved master resume
export const getPredictions = () => {
    const token = getCookieFromBrowser('token')

    return (dispatch, getState) => {
        dispatch({ type: LOADING, loading: true })
        if (token) {
            axios(predictApiUrl, getAuthConfig(token))
                .then(res => {
                    dispatch({
                        type: ESTIMATION,
                        predictions: res.data.predictions,
                        position: getState().user.position
                    })
                })
                .catch(err => console.error(err))
        } else {
            dispatch({ type: CLEAR_USER_DATA })
        }
    }
}

export const sendCvForResults = (formData: IResumeUpload): anyType => {
    const token = getCookieFromBrowser('token')

    return dispatch => {
        dispatch({ type: LOADING, loading: true })
        if (token) {
            axios
                .post(predictApiUrl, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`
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
                .finally(() => dispatch({ type: LOADING, loading: false }))
        } else {
            dispatch({ type: CLEAR_USER_DATA })
        }
    }
}

// Send real user salary to base
export const sendRealSalary = (salary: number) => {
    const token = getCookieFromBrowser('token')

    return (dispatch, getState) => {
        dispatch({ type: LOADING, loading: true })
        const data = {
            email: getState().user.email,
            salary,
            estimate: false
        }

        if (token) {
            axios
                .put(predictApiUrl, data, getAuthConfig(token))
                .then(() => dispatch({ type: THANX_MODAL, isThanxModal: true }))
                .catch(err => apiErrorHandling(err, dispatch))
                .finally(() => dispatch({ type: LOADING, loading: true }))
        } else {
            dispatch({ type: CLEAR_USER_DATA })
        }
    }
}
