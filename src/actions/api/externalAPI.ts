import axios from 'axios'
import { GET_CURRENCY_RATES } from '../actionTypes'
import { anyType } from '../../typings/types'

export const getCurrencyRates = () => {
    return (dispatch: anyType) => {
        axios('https://api.exchangeratesapi.io/latest?base=USD&symbols=USD,EUR,GBP')
            .then((response: any) => {
                if (!response.success || !response?.data?.rates) {
                    return
                }
                dispatch({ type: GET_CURRENCY_RATES, currencyRates: response.data.rates })
            })
            .catch(error => console.error(error))
    }
}
