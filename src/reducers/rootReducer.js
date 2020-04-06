import { combineReducers } from 'redux';

import {
    getGlobalCoronaData,
    getSelectedCountry,
} from './Application/reducers';

const rootReducer = combineReducers({
    getGlobalCoronaData,
    getSelectedCountry,
});

export default rootReducer;

