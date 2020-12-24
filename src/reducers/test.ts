import {
    SAVE_TEST_DATA,
    SAVE_PERSONAL_INFO,
    FETCH_TERMS,
    FETCH_TEST_DESC,
    CLEAR_TEST_DATA,
    PSYCHO_RESULT
} from '../actions/actionTypes'
import { loadState } from '../store/sessionStorage'
import { isBrowser } from '../helper/helper'

// let STATE = isBrowser ? loadState('test') : null

const STATE = {
    personalInfo: null,
    testData: null,
    dataForPDF: null,
    terms: null,
    descriptions: null
}

export type testStoreType = {
    personalInfo: [] | null
    testData: [] | null
    dataForPDF: Record<string, unknown> | null
    terms: Record<string, unknown> | null
    descriptions: [] | null
}

export const test = (
    state = STATE,
    { type, personalInfo, testData, terms, descriptions, dataForPDF }
) => {
    switch (type) {
        case SAVE_PERSONAL_INFO:
            return {
                ...state,
                personalInfo
            }
        case SAVE_TEST_DATA:
            return {
                ...state,
                testData
            }
        case PSYCHO_RESULT:
            return {
                ...state,
                dataForPDF
            }
        case FETCH_TERMS:
            return {
                ...state,
                test,
                terms
            }
        case FETCH_TEST_DESC:
            return {
                ...state,
                descriptions
            }
        case CLEAR_TEST_DATA:
            return {
                ...state,
                personalInfo: null,
                testData: null
            }
        default:
            return state
    }
}
