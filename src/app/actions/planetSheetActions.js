import Api from "../api";
import {zipObject, range, map, uniq, each} from "lodash"
import Helper from "./../helpers";
export const PSHEET_UNMOUNT = "PSHEET_UNMOUNT";
export const PSHEET_GET = "PSHEET_GET";
export const PSHEET_UPDATE_VARIABLES = "PSHEET_UPDATE_VARIABLES";
export const PSHEET_GET_PRICES = "PSHEET_GET_PRICES";
export const PSHEET_SEARCH_OUTPUT_SYSTEMS = "PSHEET_SEARCH_OUTPUT_SYSTEMS";
export const PSHEET_SEARCH_INPUT_SYSTEMS = "PSHEET_SEARCH_INPUT_SYSTEMS";

export function searchInputSystem(term) {
  return dispatch => {
    return Api.Search.system(term).then(json => {
      dispatch({
        type: PSHEET_SEARCH_INPUT_SYSTEMS,
        payload: {
          suggestions_input: json.data.items
        }
      });
    });
  };
}

export function searchOutputSystem(term) {
  return dispatch => {
    return Api.Search.system(term).then(json => {
      dispatch({
        type: PSHEET_SEARCH_OUTPUT_SYSTEMS,
        payload: {
          suggestions_output: json.data.items
        }
      });
    });
  };
}

export function getPrices(systemID, typeIDs) {
  return dispatch => {
    return Api.Main.prices(systemID, typeIDs).then(json => {
      dispatch({
        type: PSHEET_GET_PRICES,
        payload: {
          prices: json.data.prices
        }
      });
    });
  };
}

export function updateVars(vars) {
  let responsePayload = {
    _need_recalculate: true
  };
  each(vars, (value, key) => {
    responsePayload[key] = value;
  })
  return dispatch => {
    dispatch({
      type: PSHEET_UPDATE_VARIABLES,
      payload: responsePayload
    });
  };
}


export function getSheet() {
  return dispatch => {
    return Api.Planet.sheet().then(json => {
      let keyMaterials = Helper.getKeys(json.data, "input", "item_id");
      keyMaterials = uniq(keyMaterials);
      let typeIds = map(json.data, 'typeID')
      typeIds = uniq(typeIds);

      let keyZippedMaterials = zipObject(keyMaterials, range(0, keyMaterials.length, 0));
      let keyZippedTypeIDS = zipObject(typeIds, range(0, typeIds.length, 0));
      let allTypes = [].concat(keyMaterials, typeIds)
      allTypes = uniq(allTypes)

      let keyZippedAllIDS = zipObject(allTypes, range(0, allTypes.length, 0));

      // TODO:: add input items [sell, buy] and output items [sell, by prices]
      dispatch({
        type: PSHEET_GET,
        payload: {
          schemes: json.data,
          p_sell: keyZippedAllIDS,
          p_buy: keyZippedAllIDS,
          _need_upd_price_input: true,
          _need_upd_price_output: true,
          items_input: keyZippedTypeIDS,
          items_output: keyZippedMaterials
        }
      });
    });
  };
}

export function unmountPlanetSheet() {
  return dispatch => {
    return dispatch({
      type: PSHEET_UNMOUNT
    });
  };
}
