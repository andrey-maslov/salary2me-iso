import {OPEN_LOGIN_MODAL, PARSING_MODAL, PARSING_TEXT} from "../actions/actionTypes"

const STATE = {
    isLoginModal: false,
    isParsingModal: false,
    isParsingTextShowed: false,
}

export type modalsStoreType = typeof STATE

export const modals = (state = STATE, {
    type,
    isLoginModalOpen,
    isParsingModal,
    isParsingTextShowed,
}) => {
    switch (type) {
        case OPEN_LOGIN_MODAL :
            return {
                ...state,
                isLoginModalOpen,
            };
        case PARSING_MODAL :
            return {
                ...state,
                isParsingModal,
            };
        case PARSING_TEXT :
            return {
                ...state,
                isParsingTextShowed,
            };
        default:
            return state
    }
}