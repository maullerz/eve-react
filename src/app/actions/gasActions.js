import {each} from 'lodash'
import Api from '../api'
export const GAS_UNMOUNT = 'GAS_UNMOUNT'
export const GAS_LIST = 'GAS_LIST'
export const GAS_UPDATE_VARIABLES = 'GAS_UPDATE_VARIABLES'
export const GAS_SEARCH_OUTPUT_SYSTEM = 'GAS_SEARCH_OUTPUT_SYSTEM'


export function getGasList() {
  return dispatch => {
    return Api.Main.gas().then(json => {
      dispatch({
        type: GAS_LIST,
        payload: {
          gas_list: json.data
        }
      });
    });
  };
}

export function unmountGas() {
  return dispatch => {
    return dispatch({
      type: GAS_UNMOUNT
    })
  }
}

export function searchOutputSystem(term) {
  return dispatch => {
    return Api.Search.system(term).then(json => {
      dispatch({
        type: GAS_SEARCH_OUTPUT_SYSTEM,
        payload: {
          suggestions: json.data.items
        }
      });
    });
  };
}

export function updateVars(vars) {
  let responsePayload = {
  };
  each(vars, (value, key) => {
    responsePayload[key] = value;
  })
  return dispatch => {
    dispatch({
      type: GAS_UPDATE_VARIABLES,
      payload: responsePayload
    });
  };
}