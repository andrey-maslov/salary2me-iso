import {
    SAVE_TEST_DATA,
    SAVE_PERSONAL_INFO,
    FETCH_TERMS,
    FETCH_TEST_DESC, CLEAR_USER_DATA
} from '../actions/actionTypes'
import { loadState } from '../store/sessionStorage'
import { isBrowser } from '../helper/helper'

let STATE = isBrowser ? loadState('test') : null

if (!STATE) {
    STATE = {
        personalInfo: null,
        testData: null,
        terms: null,
        descriptions: null
    }
}

export type testStoreType = {
    personalInfo: [] | null
    testData: [] | null
    terms: Record<string, unknown> | null
    descriptions: [] | null
}

export const test = (state = STATE, { type, personalInfo, testData, terms, descriptions }) => {
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
        case CLEAR_USER_DATA:
            return {
                ...state,
                personalInfo: null,
                testData: null
            }
        default:
            return state
    }
}
