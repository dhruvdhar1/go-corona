import * as types from '../actionTypes';

export function getGlobalCoronaData(globalCoronaData) {
  return { type: types.GET_GLOBAL_CORONA_DATA, globalCoronaData };
}