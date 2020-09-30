import {userStoreType} from "../reducers/user"
import {cvStoreType} from "../reducers/cv"
import {testStoreType} from "../reducers/test"
import {modalsStoreType} from "../reducers/modals"
import {appStoreType} from "../reducers/app"

export interface IModalProps {
    isModalShown: boolean
    closeModal: () => void
}

export interface ILocation {
    countryISO: string
    city: string
    costLivingIndex: string
}

export type globalStoreType = {
    user: userStoreType,
    cv: cvStoreType,
    test: testStoreType,
    app: appStoreType
    modals: modalsStoreType
}

export type AnswerType = {
    id: string
    value: string | number
}

export interface QuestionsProps {
    saveAnswers: (data: number[] | number[][]) => void
    questions: any
    isVisible: boolean
    changeBlock: (blockToShow: string, currentBlock?: string) => void
    content?: string
    t?: any
}

export interface ISignUpData {
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    city: {
        id: number,
        name: string
    }
}
export interface ISignInData {
    username: string
    password: string
}