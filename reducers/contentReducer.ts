import {
    ADD_COOKIE_POLICY_CONTENT,
    ADD_MAIN_CONTENT,
    ADD_PRIVACY_POLICY_CONTENT,
    ADD_TERMS_CONTENT
} from "../actions/types";

const CONTENT_STATE = {
    pages: {
        main: '',
        terms: '',
        cookiePolicy: '',
        privacyPolicy: '',
    },
    modals: {
        cookieConsent: ''
    }
};

export const contentReducer = (state = CONTENT_STATE, {type, payload}) => {
    switch (type) {
        case ADD_MAIN_CONTENT :
            return {
                ...state,
                pages: {
                    ...state.pages,
                    main: payload
                },
            };
        case ADD_TERMS_CONTENT :
            return {
                ...state,
                pages: {
                    ...state.pages,
                    terms: payload
                },
            };
        case ADD_COOKIE_POLICY_CONTENT :
            return {
                ...state,
                pages: {
                    ...state.pages,
                    cookiePolicy: payload,
                }
            };
        case ADD_PRIVACY_POLICY_CONTENT :
            return {
                ...state,
                pages: {
                    ...state.pages,
                    privacyPolicy: payload,
                }
            };


        default:
            return state;
    }
};