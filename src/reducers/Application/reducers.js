import * as types from '../../actions/actionTypes';
export function getGlobalCoronaData(data = [], action) {
    switch (action.type) {
      case types.GET_GLOBAL_CORONA_DATA:
        return action.globalCoronaData;
      default:
        return data;
    }
  }
export function getSelectedCountry(data = {}, action) {
    switch (action.type) {
      case types.GET_SELECTED_COUNTRY:
        return action.selectedCountry;
      default:
        return data;
    }
  }