import ApiService from './../../api'
import {map} from "lodash"

export const SEARCH_BPC = 'SEARCH_BPC'
export const GET_BPC = 'GET_BPC'
export const RESET_SEARCH = 'RESET_SEARCH'
export const SET_PRICES = 'SET_PRICES'

// autocomplete search bpc
export function searchBpc(term) {
  return dispatch => {
    return ApiService.Manufacture.searchBpc(term)
      .then((res) => {
        dispatch(setAutocompleteItems(res.data.items))
      })
  }
}
// get bpc by url
export function getBpc(url) {
  return dispatch => {
    return ApiService.Manufacture.getBpc(url)
      .then((res) => {
        dispatch(setBlueprint(res.data))
        dispatch(getPrices(30000142, res.data.price_items.join(",")))
      })
  }
}

export function getPrices(system_id, items) {
  return ApiService.Main.prices(system_id, items)
    .then((json) => {
      setPrices(json.data.prices)
    })
}
// reset suggestions
export function resetSearch() {
  return dispatch => {
    return dispatch(unsetSearch())
  }
}

export function setPrices(prices) {
  return {
    type: SET_PRICES,
    prices: prices
  }
}

// Export Dispatches functions
export function setBlueprint(response) {
  return {
    type: GET_BPC,
    bpc: response.bpc,
    used_in: response.used_in,
    bpc_components: response.bpc_components,
    decryptors: response.decryptors,
    item: response.item,
    price_items: response.price_items
  }
}

export function setAutocompleteItems(suggestions) {
  return {
    type: SEARCH_BPC,
    suggestions: suggestions
  }
}

export function unsetSearch() {
  return {
    type: RESET_SEARCH,
    suggestions: []
  }
}
