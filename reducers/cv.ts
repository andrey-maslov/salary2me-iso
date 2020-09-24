import {
    ADD_USER_SALARY,
    ESTIMATION,
    CV_SENT,
} from '../actions/actionTypes'

import {loadState} from '../store/sessionStorage'
import {isBrowser} from "../helper/helper";

let STATE

//TODO some problem with storage and SSR maybe
if (isBrowser) {
    STATE = loadState('cv');
}

export type cvStoreType = {
    predictions: [],
    position: string,
    realSalary: string,
    isCvSent: boolean,
}

if (!STATE) {
    STATE = {
        predictions: [],
        position: '',
        realSalary: '',
        isCvSent: false,
    }
}

export const cv = (state = STATE, {
    type,
    position,
    predictions,
    realSalary,
    isCvSent
}) => {
    switch (type) {
        case ADD_USER_SALARY :
            return {
                ...state,
                realSalary,
            }
        case CV_SENT :
            return {
                ...state,
                isCvSent
            }
        case ESTIMATION :
            return {
                ...state,
                predictions,
                position,
            }
        default:
            return state
    }
}