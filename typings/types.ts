import {userStoreType} from "../reducers/user";
import {cvStoreType} from "../reducers/cv";
import {testStoreType} from "../reducers/test";
import {modalsStoreType} from "../reducers/modals";
import {appStoreType} from "../reducers/app";

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