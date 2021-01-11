import { FETCH_TERMS, FETCH_TEST_DESC } from '../actionTypes'
import { termsApiUrl } from './utils'
import { anyType } from '../../typings/types'

export const fetchTerms = (lang: string) => {
    return (dispatch: anyType) => {
        fetch(`${termsApiUrl}/1`)
            .then(response => response.json())
            .then(data => dispatch({ type: FETCH_TERMS, terms: data[`content_${lang}`] }))
    }
}

export const fetchContent = (lang: string) => {
    return (dispatch: anyType) => {
        fetch(`${termsApiUrl}/2`)
            .then(response => response.json())
            .then(data =>
                dispatch({ type: FETCH_TEST_DESC, descriptions: data[`content_${lang}`] })
            )
    }
}
