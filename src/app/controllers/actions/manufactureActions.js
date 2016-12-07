import ApiService from './../../api'

export const SEARCH_BPC = 'SEARCH_BPC'
export const GET_BPC = 'GET_BPC'
export const RESET_SEARCH = 'RESET_SEARCH'

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
    })
  }
}

// reset suggestions
export function resetSearch() {
  return dispatch => {
    return dispatch(unsetSearch())
  }
}

// Export Dispatches functions

export function setBlueprint(bpc) {
  return {
    type: GET_BPC,
    bpc: bpc,
    bpc_title: bpc.bpc.blueprint_name
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
    suggestions: [],
    bpc: {},
    bpc_title: ""
  }
}
