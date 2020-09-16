import {
    PREDICTIONS_REQUEST_ERRORED,
    PREDICTIONS_REQUEST_LOADING,
    UPDATE_REQUEST_LOADING,
    UPDATE_REQUEST_ERRORED,
} from '../actions/actionTypes';


export const predictionsRequestHasErrored = (state = false, {type, hasErrored}) => {
    switch (type) {
        case PREDICTIONS_REQUEST_ERRORED :
            return  hasErrored;
        default:
            return state;
    }
};

export const predictionsRequestLoading = (state = false, {type, isLoading}) => {
    switch (type) {
        case PREDICTIONS_REQUEST_LOADING :
            return isLoading;
        default:
            return state;
    }
};

export const updateRequestHasErrored = (state = false, {type, hasErrored}) => {
    switch (type) {
        case UPDATE_REQUEST_ERRORED :
            return  hasErrored;
        default:
            return state;
    }
};

export const updateRequestLoading = (state = false, {type, isLoading}) => {
    switch (type) {
        case UPDATE_REQUEST_LOADING :
            return isLoading;
        default:
            return state;
    }
};
