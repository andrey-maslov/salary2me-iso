import axios from 'axios'
import { getCookieFromBrowser } from '../../helper/cookie'
import { globalStoreType } from '../../typings/types'
import { CLEAR_USER_DATA, SET_TOAST } from '../actionTypes'
import { savePersonalInfo, saveTestData } from '../actionCreator'
import { getAuthConfig, getDecodedTestData, testApiUrl } from './utils'

export function sendTestData(): unknown {
    const token = getCookieFromBrowser('token')
    return (dispatch, getState: () => globalStoreType) => {
        const { test: { personalInfo, testData } } = getState()
        const encData: string = btoa(JSON.stringify([personalInfo, testData]))
        const data = { value: encData, type: 0 }

        if (token) {
            axios
                .post(`${testApiUrl}/add`, data, getAuthConfig(token))
                .then(() => dispatch({ type: SET_TOAST, setToast: 1 }))
                .catch(() => dispatch({ type: SET_TOAST, setToast: 2 }))
        } else {
            dispatch({ type: CLEAR_USER_DATA })
        }
    }
}

export function fetchTestData(token: string): unknown {
    return (dispatch, getState) => {
        if (token && getState().user.isLoggedIn) {
            axios
                .get(`${testApiUrl}/list`, getAuthConfig(token))
                .then(res => {
                    if (res.data.length > 0) {
                        const decodedData = getDecodedTestData(res.data)
                        dispatch(savePersonalInfo(decodedData[0]))
                        dispatch(saveTestData(decodedData[1]))
                    }
                })
                .catch(error => console.error(error))
        } else {
            dispatch({ type: CLEAR_USER_DATA })
        }
    }
}
