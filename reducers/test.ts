import {
    SAVE_TEST_DATA,
    SAVE_PERSONAL_INFO, FETCH_TERMS, FETCH_DESCRIPTIONS,
} from '../actions/actionTypes'
import { loadState } from '../store/sessionStorage'
import {isBrowser} from "../helper/helper"

let STATE = isBrowser ? loadState('test') : null

if (!STATE) {
    STATE = {
        personalInfo: [],
        testData: [],
        terms: null,
        descriptions: null
    }
}

export type testStoreType = {
    personalInfo: [],
    testData: [],
    terms: {} | null,
    descriptions: [] | null
}

export const test = (state = STATE, {
    type,
    personalInfo,
    testData,
    terms,
    descriptions
}) => {
    switch (type) {
        case SAVE_PERSONAL_INFO :
            return {
                ...state,
                personalInfo
            }
        case SAVE_TEST_DATA :
            return {
                ...state,
                testData
            }
        case FETCH_TERMS :
            return {
                ...state,
                test,
                terms,
            }
        case FETCH_DESCRIPTIONS :
            return {
                ...state,
                descriptions
            }
        default:
            return state
    }
}