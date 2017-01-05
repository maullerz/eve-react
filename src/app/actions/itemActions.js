import ApiService from './../api'
import {findIndex} from 'lodash'

export const ITEM_SET = 'ITEM_SET'
export const ITEM_UNMOUNT = 'ITEM_UNMOUNT'
export const ITEM_SELECT = 'ITEM_SELECT'
export const ITEM_RESET_SUGG = 'ITEM_RESET_SUGG'
export const ITEM_SET_TYPE_PRICE = 'ITEM_SET_TYPE_PRICE'
export const ITEM_SEARCH_SYSTEM = 'ITEM_SEARCH_SYSTEM'
export const ITEM_SYSTEM_SET = 'ITEM_SYSTEM_SET'
export const ITEM_SYSTEM_RESET = 'ITEM_SYSTEM_RESET'
export const ITEM_GET_BY_URL = 'ITEM_GET_BY_URL'
export const ITEM_UPDATE_NEED = 'ITEM_UPDATE_NEED'
export const ITEM_SET_PRICES = 'ITEM_SET_PRICES'
export const GET_USED_IN = 'GET_USED_IN'

export function getBpcByComponent(component_id, page, limit) {
  return dispatch => {
    ApiService.Item.whereUsedComponent(component_id, page, limit).then(json => {
      dispatch(getBpcByComponentState(json.data))
    })
  }
}

export function setSystem(system_id) {
  return dispatch => {
    dispatch(setSystemState(system_id))
  }
}

export function updNeed(key, val) {
  return dispatch => {
    dispatch(updNeedState(key, val))
  }
}

export function resetSystem() {
  return dispatch => {
    dispatch(resetSystemState())
  }
}

export function getComponentByUrl(url) {
  return dispatch => {
    ApiService.Search.componentByUrl(url).then(json => {
      dispatch(getComponentByUrlState(url, json.data.items))
    })
  }
}

export function getPrices(itemId, systemId) {
  return dispatch => {
    ApiService.Main.prices(systemId, itemId).then(json => {
      dispatch(getPricesState(json.data.prices))
    })
  }
}

export function searchSystem(term) {
  return dispatch => {
    ApiService.Search.system(term).then(json => {
      dispatch(setSuggSystem(json.data.items))
    })
  }
}

export function setTypePrice(type) {
  return dispatch => {
    dispatch(setTypePriceState(type))
  }
}

export function searchItem(term) {
  return dispatch => {
    ApiService.Search.component(term).then(json => {
      dispatch(setSugg(json.data.items))
    })
  }
}
export function unmountItem() {
  return dispatch => {
    dispatch(unmountItemState())
  }
}
export function resetSearch() {
  return dispatch => {
    dispatch(resetSearchState())
  }
}

export function addItem(item) {
  return dispatch => {
    dispatch(addItemState(item))
  }
}

export function getBpcByComponentState(json) {
  return {
    type: GET_USED_IN,
    used_in: json.items,
    total_pages: json.total_pages,
    total_items: json.total_items
  }
}

export function setSystemState(system_id) {
  return {
    type: ITEM_SYSTEM_SET,
    system_id: +system_id
  }
}
export function getPricesState(prices) {
  return {
    type: ITEM_SET_PRICES,
    prices: prices
  }
}
export function resetSystemState() {
  return {
    type: ITEM_SYSTEM_RESET,
    system_sugg: []
  }
}
export function setSuggSystem(items) {
  return {
    type: ITEM_SEARCH_SYSTEM,
    system_sugg: items
  }
}
export function unmountItemState() {
  return {
    type: ITEM_UNMOUNT
  }
}
export function setSugg(items) {
  return {
    type: ITEM_SET,
    item_sugg: items
  }
}
export function getComponentByUrlState(url, items) {

  let returned = {
    type: ITEM_GET_BY_URL,
    item: {},
    _need_update_prices: true,
    _need_get_bpc: true,
    page: 1
  }
  if (items) {
    let index = findIndex(items, v => {
      return v.url === url
    })
    if (index >= 0) {
      returned.item = items[index]
    }
  }
  return returned

}
export function addItemState(item) {
  return {
    type: ITEM_SELECT,
    item: item,
    page: 1,
    _need_update_prices: true,
    _need_get_bpc: true

  }
}
function resetSearchState() {
  return {
    type: ITEM_RESET_SUGG,
    item_sugg: []
  }
}

function setTypePriceState(type) {
  return {
    type: ITEM_SET_TYPE_PRICE,
    type_price: type
  }
}
//
// export function getSimilarItems(itemId) {
//   return dispatch => {
//     return ApiService.Search.similar(itemId).then(json => {
//       dispatch(setSimilarItems(json.data.items))
//     })
//   }
// }

export function updNeedState(key, val) {
  return {
    type: ITEM_UPDATE_NEED,
    _k: key,
    _v: val
  }
}

// export function setSimilarItems(items) {
//   return {
//     type: SET_SIMILAR,
//     similarItems: items
//   }
// }


