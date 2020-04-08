import { combineReducers } from 'redux';

import {
    getGlobalCoronaData,
    getSelectedCountry,
    getAllCountriesData,
} from './Application/reducers';

const rootReducer = combineReducers({
    getGlobalCoronaData,
    getSelectedCountry,
    getAllCountriesData,
});

export default rootReducer;

