import axios from 'axios'
import { getCookieFromBrowser } from '../../helper/cookie'
import { getAuthConfig, billingApiUrl } from './utils'
import { anyType } from '../../typings/types'

export async function fetchUsersBillingData(): Promise<anyType> {
    const token = getCookieFromBrowser('token')
    try {
        const response = await axios(`${billingApiUrl}/list`, getAuthConfig(token))
        const { data } = response
        return data
    } catch (err) {
        throw new Error(err)
    }
}
