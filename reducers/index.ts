import {combineReducers} from 'redux'
import {userData} from './userData'
import {appReducer} from './appReducer'
import {applicationMode} from './applicationMode'
import {predictionsRequestHasErrored, predictionsRequestLoading, updateRequestHasErrored, updateRequestLoading} from "./requestStatus"

const rootReducer = combineReducers({
    userData,
    appReducer,
    applicationMode,
    predictionsRequestHasErrored,
    predictionsRequestLoading,
    updateRequestHasErrored,
    updateRequestLoading,
});

export default rootReducer;