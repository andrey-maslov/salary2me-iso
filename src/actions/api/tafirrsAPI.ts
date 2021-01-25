import axios from 'axios'
import { IMembershipPlan } from '../../typings/types'
import { tariffsApiUrl } from './utils'

// All tariff plans of all services
export async function fetchTariffsData(): Promise<IMembershipPlan[] | null> {
    try {
        const response = await axios(`${tariffsApiUrl}/list`)
        return response.data
    } catch (err) {
        if (err.response && err.response.status) {
            return err.response.status
        }
        return null
    }
}
