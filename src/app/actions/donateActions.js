import ApiService from './../api'
import {forEach} from "lodash"

export const SET_LIST = 'SET_LIST'
export const DONATE_UNMOUNT = 'DONATE_UNMOUNT'


export function unmountDonate(){
  return dispatch => {
    return dispatch(unmountDonateState())
  }
}

export function getDonatorList() {
  return dispatch => {
    return ApiService.Donate.donate().then(json => {
      dispatch(setDonatorList(json.data))
    })
  }
}

function unmountDonateState() {
  return {
    type: DONATE_UNMOUNT
  }
}

function setDonatorList(donators) {
  let authors = []
      forEach(donators.authors, function (val, index) {
        authors.push({
          char_id: index,
          char_name: val.name,
          description: val.about
        })
      })
  return {
    type: SET_LIST,
    authors: authors,
    contributors: donators.left,
    donators: donators.right,
  }
}
