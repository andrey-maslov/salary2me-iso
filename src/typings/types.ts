import { baseTestResultType } from 'psychology/build/main/types/types'
import { userStoreType } from '../reducers/user'
import { cvStoreType } from '../reducers/cv'
import { testStoreType } from '../reducers/test'
import { modalsStoreType } from '../reducers/modals'
import { appStoreType } from '../reducers/app'
import { authModes } from '../constants/constants'

export type anyType = any

/**
 * all tariffs ids are real tariffs if from data base
 * 0 - free basic tariff
 * 3 - paid Month tariff with all access
 * 4 - paid Year tariff with all access
 * 5 - free Promo tariff with all access
 */
export type TariffId = 0 | 1 | 2 | 3 | 4 | 5 | 6

export interface IModalProps {
    isModalShown: boolean
    closeModal: () => void
    t?: anyType
}

export interface ILocation {
    countryISO: string
    city: string
    costLivingIndex: string
}

export type globalStoreType = {
    user: userStoreType
    cv: cvStoreType
    test: testStoreType
    app: appStoreType
    modals: modalsStoreType
}

export type AnswerType = {
    id: string
    value: string | number
}

export interface QuestionsProps {
    changeBlock: (blockToShow: string, currentBlock?: string) => void
    questionsSubmit: (answers: baseTestResultType | number[]) => unknown
    t?: anyType
}

export interface IQuestion {
    title: string
    values: string[]
}

export interface ISignUpData {
    email: string
    password: string
    firstName: string
    lastName: string
    city: {
        id: number
        name: string
    }
}

export interface ISignInData {
    username: string
    password: string
}

export interface IOneFieldForm<T> {
    [key: string]: T
}

export interface IGetTestsResponse {
    id: number
    userId: string
    value: string
    type: number
}

export interface IUserData {
    firstName?: string
    lastName?: string
    email?: string
    position?: string
    provider?: string
    isPublicProfile?: boolean
    isOpenForWork?: boolean
}

export interface INewPwdData {
    code: string
    newPassword: string
    email: string
}

export type AuthData = ISignUpData | ISignInData

export type AuthType = keyof typeof authModes

// TODO need to typing
export interface IResumeUpload {
    [key: string]: anyType
}

export interface IEmailConfirmation {
    userId: string
    code: string
    email?: string
}

export interface IChangeEmail {
    newEmail: string
    service: number
}

export interface IMembershipPlan {
    id: TariffId
    title: string
    description: string | null
    price: number
    service: number
    monthCount: number
    autoSearchCount?: number | null
    features?: string[]
}

export interface ISubscription {
    id: string
    membershipPlan: IMembershipPlan
    startedDate: string | null
    endedDate: string | null
    status: number
    autoPayment: boolean
}

export interface ITariffText {
    title: string
    period?: string
    desc: string
    features: string[]
    link_title: string
}