import ApiService from './../../api'

export const ITEM_SET = 'SET_SUGG'
export const ITEM_UNMOUNT = 'UNMOUNT_ITEM'

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
// export function addItem(item) {
//   return dispatch => {
//     dispatch(addItemState(item))
//   }
// }
//
// export function getSimilarItems(itemId) {
//   return dispatch => {
//     return ApiService.Search.similar(itemId).then(json => {
//       dispatch(setSimilarItems(json.data.items))
//     })
//   }
// }

// export function resetSearch() {
//   return dispatch => {
//     dispatch(resetSearchState())
//   }
// }

// export function updNeedState(key, val) {
//   return {
//     type: UPDATE_NEED,
//     key: key,
//     val: val
//   }
// }

// export function setSimilarItems(items) {
//   return {
//     type: SET_SIMILAR,
//     similarItems: items
//   }
// }

// export function addItemState(item) {
//   return {
//     type: ADD_ITEM,
//     new_item: item
//   }
// }

// function resetSearchState() {
//   return {
//     type: RESET_SUGG,
//     sugg: []
//   }
// }
