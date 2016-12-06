import ApiService from './../../api'

export const MANUFACTURE_SEARCH_BPO = 'MANUFACTURE_SEARCH_BPO'
export const MANUFACTURE_GET_BPC = 'MANUFACTURE_SET_BPO'

// autocomplete search bpc
export function searchBpo(term) {
  return dispatch => {
    return ApiService.Manufacture.searchBpc(term)
      .then((res) => {
        dispatch(setAutocompleteItems(res.data.items))
      })
  }
}
// get bpc by url
export function getBlueprint(url) {
  return dispatch => {
    return ApiService.Manufacture.getBpc(url)
      .then((res) => {
        dispatch(setBlueprint(res.data))
      })
  }
}

export function setBlueprint(bpc) {
  return {
    type: MANUFACTURE_GET_BPC,
    bpc: bpc,
    bpc_title: bpc.bpc.blueprint_name
  }
}

export function setAutocompleteItems(suggestions) {
  return {
    type: MANUFACTURE_SEARCH_BPO,
    suggestions: suggestions
  }
}
