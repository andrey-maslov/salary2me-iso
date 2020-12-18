import axios from 'axios'
import { GET_CURRENCY_RATES } from '../actionTypes'
import { anyType } from '../../typings/types'

export const getCurrencyRates = () => {
    return (dispatch: anyType) => {
        axios('https://api.exchangeratesapi.io/latest?base=USD&symbols=USD,EUR,GBP')
            .then(response => response.data.rates)
            .then(rates => dispatch({ type: GET_CURRENCY_RATES, currencyRates: rates }))
            .catch(error => console.error(error))
    }
}
