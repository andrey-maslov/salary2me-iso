import {combineReducers} from 'redux';
import {userData} from './userData';
import {appReducer} from './appReducer';
import {applicationMode} from './applicationMode';
import {contentReducer} from './contentReducer';
import {predictionsRequestHasErrored, predictionsRequestLoading, updateRequestHasErrored, updateRequestLoading} from "./requestStatus";

const rootReducer = combineReducers({
    userData,
    appReducer,
    applicationMode,
    contentReducer,
    predictionsRequestHasErrored,
    predictionsRequestLoading,
    updateRequestHasErrored,
    updateRequestLoading,
});

export default rootReducer;