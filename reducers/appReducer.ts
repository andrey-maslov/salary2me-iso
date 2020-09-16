import {OPEN_LOGIN_MODAL, ONLY_LOGGED_MODAL, PARSING_MODAL, PARSING_TEXT} from "../actions/actionTypes";

const APP_STATE = {
    isLoginModalOpen: false,
    isOnlyLoggedModal: false,
    isParsingModal: false,
    isParsingTextShowed: false,
};

export type AppReducerType = typeof APP_STATE;

export const appReducer = (state = APP_STATE, {
    type,
    isLoginModalOpen,
    isOnlyLoggedModal,
    isParsingModal,
    isParsingTextShowed,
}) => {
    switch (type) {
        case OPEN_LOGIN_MODAL :
            return {
                ...state,
                isLoginModalOpen,
            };
        case ONLY_LOGGED_MODAL :
            return {
                ...state,
                isOnlyLoggedModal,
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
            return state;
    }
};