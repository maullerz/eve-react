import ApiService from './../../api'

export const SET_SUGG = 'SET_SUGG'
export const RESET_SUGG = 'RESET_SUGG'
export const UNMOUNT_MARKET = 'UNMOUNT_MARKET'


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