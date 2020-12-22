import { DecodedDataType } from 'psychology/build/main/types/types'
import { API_VER, BASE_API, CONTENT_API } from '../../constants/constants'
import { IGetTestsResponse } from '../../typings/types'

export const accountApiUrl = `${BASE_API}/api/v${API_VER}/Account`
export const usersApiUrl = `${BASE_API}/api/v${API_VER}/Users`
export const testApiUrl = `${BASE_API}/api/v${API_VER}/PsychologicalTests`
export const predictApiUrl = `${BASE_API}/api/v${API_VER}/Predict`
export const termsApiUrl = `${CONTENT_API}/psychologies`
export const billingApiUrl = `${BASE_API}/api/v${API_VER}/Subscriptions`
export const tariffsApiUrl = `${BASE_API}/api/v${API_VER}/MembershipPlans`

export interface IProjectFromBase {
    id: string
    title: string
    pool: string
    teams: string
}

export const getAuthConfig = (jwt: string) => {
    return {
        headers: {
            Authorization: `Bearer ${jwt}`
        }
    }
}

export function getDecodedTestData(testList: IGetTestsResponse[]): DecodedDataType {
    const neededTest: IGetTestsResponse = testList.filter(test => test.type === 0)[0]
    const decodedData = atob(neededTest.value)
    return JSON.parse(decodedData)
}
