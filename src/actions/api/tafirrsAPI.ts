import axios from 'axios'
import { ITariff } from '../../typings/types'
import { tariffsApiUrl } from './utils'

// All tariff plans of all services
export async function fetchTariffsData(): Promise<ITariff[] | null> {
    try {
        const response = await axios(`${tariffsApiUrl}/list`)
        return response.data
    } catch {
        return null
    }
}
