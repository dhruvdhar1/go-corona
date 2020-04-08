import * as types from '../actionTypes';

export function getGlobalCoronaData(globalCoronaData) {
  return { type: types.GET_GLOBAL_CORONA_DATA, globalCoronaData };
}
export function getAllCountriesData(getAllCountriesData) {
  return { type: types.GET_ALL_COUNTRIES_CORONA_DATA, getAllCountriesData };
}
export function getSelectedCountry(selectedCountry) {
  return { type: types.GET_SELECTED_COUNTRY, selectedCountry };
}