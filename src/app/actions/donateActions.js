import ApiService from './../api'

export const SET_LIST = 'SET_LIST'

export function getDonatorList() {
  return dispatch => {
    return ApiService.Donate.donate().then(json => {
      dispatch(setDonatorList(json.data))
    })
  }
}

function setDonatorList(donators) {
  return {
    type: SET_LIST,
    payload: donators
  }
}
