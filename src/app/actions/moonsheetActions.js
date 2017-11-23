import Api from "../api";
import { zipObject, cloneDeep, range, map, uniq } from "lodash";
import Helper from "./../helpers";
export const MSHEET_UNMOUNT = "MSHEET_UNMOUNT";
export const MSHEET_GET = "MSHEET_GET";
export const MSHEET_UPDATE_VARIABLE = "MSHEET_UPDATE_VARIABLE";
export const MSHEET_GET_PRICES = "MSHEET_GET_PRICES";
export const MSHEET_SEARCH_OUTPUT_SYSTEMS = "MSHEET_SEARCH_OUTPUT_SYSTEMS";
export const MSHEET_SEARCH_INPUT_SYSTEMS = "MSHEET_SEARCH_INPUT_SYSTEMS";

export function searchOutputSystem(term) {
  return dispatch => {
    return Api.Search.system(term).then(json => {
      dispatch({
        type: MSHEET_SEARCH_OUTPUT_SYSTEMS,
        payload: {
          suggestions_output: json.data.items
        }
      });
    });
  };
}

export function searchInputSystem(term) {
  return dispatch => {
    return Api.Search.system(term).then(json => {
      dispatch({
        type: MSHEET_SEARCH_INPUT_SYSTEMS,
        payload: {
          suggestions_input: json.data.items
        }
      });
    });
  };
}

export function getPrices(systemID, typeIDs) {
  return dispatch => {
    return Api.Main.prices(systemID, typeIDs).then(json => {
      dispatch({
        type: MSHEET_GET_PRICES,
        payload: {
          prices: json.data.prices
        }
      });
    });
  };
}

export function getPricesMarketer(systemID, typeIDs) {
  return dispatch => {
    return Api.Main.pricesMarketer(systemID, typeIDs).then(json => {
      // console.log('marketer json:', json)
      const buy = {}
      const sell = {}
      json.data.forEach(item => {
        const typeId = item.buy.forQuery.types[0]
        buy[typeId] = item.buy.max
        sell[typeId] = item.sell.min
        if (!item.buy.max) {
          console.log('zero buy:', item)
        }
        if (!item.sell.min) {
          if (typeId === 16648) {
            buy[typeId] = 9200
            sell[typeId] = 10500
          } else {
            console.log('zero sell:', item)
          }
        }
      })

      const prices = { sell, buy }
      console.log('prices:', prices)
      dispatch({
        type: MSHEET_GET_PRICES,
        payload: { prices }
      });
    });
  };
}

export function updateVar(variable, value) {
  let responsePayload = {
    _need_recalculate: true
  };
  responsePayload[variable] = value;
  return dispatch => {
    dispatch({
      type: MSHEET_UPDATE_VARIABLE,
      payload: responsePayload
    });
  };
}

export function getSheet() {
  return dispatch => {
    return Api.Moon.sheet().then(json => {
      let keyMaterials = Helper.getKeys(json.data.reactions, "input", "item_id");
      keyMaterials = uniq(keyMaterials);

      let keyMain = map(json.data.reactions, "item_id");
      let keys = uniq(keyMaterials.concat(keyMain));
      let keyZipped = zipObject(keys, range(0, keys.length, 0));

      dispatch({
        type: MSHEET_GET,
        payload: {
          reactions: json.data.reactions,
          refined: json.data.refined,
          prices: {
            sell: cloneDeep(keyZipped),
            buy: cloneDeep(keyZipped)
          },
          _need_upd_price_input: true,
          _need_upd_price_output: true,
          items_input: keyMaterials,
          items_output: keyMain
        }
      });
    });
  };
}

export function unmountMoonSheet() {
  return dispatch => {
    return dispatch({
      type: MSHEET_UNMOUNT
    });
  };
}
