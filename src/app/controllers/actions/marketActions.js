import ApiService from './../../api'

export const SET_SUGG = 'SET_SUGG'
export const RESET_SUGG = 'RESET_SUGG'
export const UNMOUNT_MARKET = 'UNMOUNT_MARKET'
export const ADD_ITEM = 'ADD_ITEM'
export const SET_SIMILAR = 'SET_SIMILAR'
export const SET_TYPE_PRICES = 'SET_TYPE_PRICES'
export const SET_PERCENTAGE = 'SET_PERCENTAGE'
export const SET_SYSTEM_SUGG = 'SET_SYSTEM_SUGG'
export const SET_SYSTEM_ID = 'SET_SYSTEM_ID'
export const UNSET_SYSTEM_SUGG = 'UNSET_SYSTEM_SUGG'
export const SET_QTY = 'SET_QTY'
export const UPDATE_NEED = 'UPDATE_NEED'
export const GET_PRICES = 'GET_PRICES'
export const REMOVE_ITEM = 'REMOVE_ITEM'

export function getPrices(system_id, item_ids) {
  return dispatch => {
    return ApiService.Main.prices(system_id, item_ids.join(","))
    .then(json => {
      dispatch(updPricesState(json.data.prices))
    })
  }
}

export function removeItem(itemId) {
  return dispatch => {
    dispatch(removeItemState(itemId))
  }
}

export function updNeed(key, value) {
  return dispatch => {
    dispatch(updNeedState(key, value))
  }
}

export function setQty(item_id, qty) {
  return dispatch => {
    dispatch(setQtyState(item_id, qty))
  }
}

export function resetSystem() {
  return dispatch => {
    dispatch(resetSystemState())
  }
}
export function searchSystem(term) {
  return dispatch => {
    return ApiService.Search.system(term).then(json => {
      dispatch(searchSystemState(json.data.items))
    })
  }
}

export function setSystem(system_id) {
  return dispatch => {
    dispatch(setSystemState(system_id))
  }
}

export function changePercentage(percentage) {
  return dispatch => {
    dispatch(changePercentageState(percentage))
  }
}

export function setTypePrice(type) {
  return dispatch => {
    dispatch(setTypePriceState(type))
  }
}

export function addItem(item) {
  return dispatch => {
    dispatch(addItemState(item))
  }
}

export function getSimilarItems(item_id) {
  return dispatch => {
    return ApiService.Search.similar(item_id).then(json => {
      dispatch(setSimilarItems(json.data.items))
    })
  }
}

export function resetSearch() {
  return dispatch => {
    dispatch(resetSearchState())
  }
}
export function searchItem(term) {
  return dispatch => {
    ApiService.Search.item(term).then(json => {
      dispatch(setSugg(json.data.items))
    })
  }
}

export function unmountMarket() {
  return dispatch => {
    dispatch(unmountMarketState())
  }
}

export function removeItemState(itemID) {
  return {
    type: REMOVE_ITEM,
    _item: itemID
  }
}

export function updPricesState(prices) {
  return {
    type: GET_PRICES,
    orig_prices: prices,
    prices: prices
  }
}
export function updNeedState(key, val) {
  return {
    type: UPDATE_NEED,
    key: key,
    val: val
  }
}

export function setQtyState(item_id, qty) {
  return {
    type: SET_QTY,
    _item_id: item_id,
    _qty: qty
  }
}

export function setSystemState(system_id) {
  return {
    type: SET_SYSTEM_ID,
    system_id: system_id,
    _need_upd_prices: true
  }
}

export function searchSystemState(items) {
  return {
    type: SET_SYSTEM_SUGG,
    s_sugg: items
  }
}

export function changePercentageState(percentage) {
  return {
    type: SET_PERCENTAGE,
    percentage: +percentage
  }
}

export function setTypePriceState(type) {
  return {
    type: SET_TYPE_PRICES,
    type_price: type
  }
}
export function setSimilarItems(items) {
  return {
    type: SET_SIMILAR,
    similarItems: items
  }
}

export function addItemState(item) {
  item.qty = 1
  return {
    type: ADD_ITEM,
    new_item: item,
    _need_upd_prices: true
  }
}

function resetSearchState() {
  return {
    type: RESET_SUGG,
    sugg: []
  }
}

export function resetSystemState() {
  return {
    type: UNSET_SYSTEM_SUGG,
    s_sugg: []
  }
}

export function setSugg(items) {
  return {
    type: SET_SUGG,
    sugg: items
  }
}
export function unmountMarketState() {
  return {
    type: UNMOUNT_MARKET
  }
}