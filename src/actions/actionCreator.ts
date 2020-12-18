import { baseTestResultType } from 'psychology/build/main/types/types'
import {
    ADD_AUTH_DATA,
    OPEN_LOGIN_MODAL,
    CV_SENT,
    CLEAR_USER_DATA,
    LOADING,
    SAVE_TEST_DATA,
    SAVE_PERSONAL_INFO,
} from './actionTypes'
import { IUserData } from '../typings/types'
import { removeCookie } from '../helper/cookie'

export * from './api/accountAPI'
export * from './api/termsAPI'
export * from './api/predictAPI'
export * from './api/psychologicalTestsAPI'
export * from './api/externalAPI'
// export * from './api/subscriptionsAPI'

/*= ==== AUTH ===== */

export function setUserData(data: IUserData): { type: string; userData: IUserData } {
    return {
        type: ADD_AUTH_DATA,
        userData: {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            position: data.position,
            provider: data.provider,
            isPublicProfile: data.isPublicProfile,
            isOpenForWork: data.isOpenForWork
        }
    }
}

export function logOut(): { type: string } {
    removeCookie('token')
    return { type: CLEAR_USER_DATA }
}

// TODO change, maybe we don't need it
export const setLoginModal = bool => ({
    type: OPEN_LOGIN_MODAL,
    isLoginModalOpen: bool
})

/*= ==== SALARY ESTIMATION ===== */

export const setCvSent = bool => ({
    type: CV_SENT,
    isCvSent: bool
})

/*= ==== TEST ===== */

// eslint-disable-next-line prettier/prettier
export const savePersonalInfo = (personalInfo: readonly number[]) => {
    return { type: SAVE_PERSONAL_INFO, personalInfo }
}

export const saveTestData = (testData: baseTestResultType) => {
    return { type: SAVE_TEST_DATA, testData }
}

/*= ==== APPLICATION MODE (app reducer) ===== */
export function setLoading(isLoading: boolean) {
    return { type: LOADING, isLoading }
}
