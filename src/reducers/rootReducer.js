import { combineReducers } from 'redux';

import {
    getGlobalCoronaData
} from './Application/reducers';

const rootReducer = combineReducers({
    getGlobalCoronaData,
});

export default rootReducer;

