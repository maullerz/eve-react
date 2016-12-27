import ApiService from './../../api'

export const SET_SUGG = 'SET_SUGG'
export const RESET_SUGG = 'RESET_SUGG'
export const UNMOUNT_MARKET = 'UNMOUNT_MARKET'
export const ADD_ITEM = 'ADD_ITEM'
export const SET_SIMILAR = 'SET_SIMILAR'

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

export function setSimilarItems(items) {
  return {
    type: SET_SIMILAR,
    similarItems: items
  }
}

export function addItemState(item) {
  return {
    type: ADD_ITEM,
    new_item: item
  }
}

function resetSearchState() {
  return {
    type: RESET_SUGG,
    sugg: []
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