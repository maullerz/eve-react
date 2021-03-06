import ApiService from './../api'

export const SET_REGION_SUGG = 'SET_REGION_SUGG'
export const SET_REGION = 'SET_REGION'
export const RESET_REGION_SUGG = 'RESET_REGION_SUGG'
export const SET_ITEM_SUGG = 'SET_ITEM_SUGG'
export const SET_ITEM = 'SET_ITEM'
export const RESET_ITEM = 'RESET_ITEM'
export const UPD_NEED = 'UPD_NEED'
export const GET_CHART_DATA = 'GET_CHART_DATA'
export const HOME_UNMOUNT = 'HOME_UNMOUNT'
export const FACEBOOK_FEED = 'FACEBOOK_FEED'

export const HOME_INFO = 'HOME_INFO'

export function getHomeInfo() {
  return dispatch => {
    return ApiService.Main.index().then(json => {
      dispatch({
        type: HOME_INFO,
        info: json.data
      })
    })
  }
}

export function getFacebookFeed () {
  return dispatch => {
    return ApiService.Main.facebook_feed().then(json => {
      dispatch(setFacebookFeedState(json.data.items))
    })
  }
}

export function unmountHome () {
  return dispatch => {
    dispatch(unmountHomeState())
  }
}

export function getChartData (regionId, itemId) {
  return dispatch => {
    return ApiService.Graph.chart(regionId, itemId).then(json => {
      dispatch(getChartDataState(json.data))
    })
  }
}

export function updNeed (k, v) {
  return dispatch => {
    dispatch(updNeedState(k, v))
  }
}

export function searchItem (term) {
  return dispatch => {
    return ApiService.Search.item(term).then(json => {
      dispatch(searchItemState(json.data.items))
    })
  }
}

export function resetItem () {
  return dispatch => {
    dispatch(resetItemState())
  }
}

export function searchRegion (term) {
  return dispatch => {
    return ApiService.Search.region(term).then(json => {
      dispatch(searchRegionState(json.data.items))
    })
  }
}
export function setRegion (region) {
  return dispatch => {
    dispatch(setRegionState(region))
  }
}
export function setItem (item) {
  return dispatch => {
    dispatch(setItemState(item))
  }
}
export function resetRegion () {
  return dispatch => {
    dispatch(resetRegionState())
  }
}

export function setFacebookFeedState (items) {
  return {
    type: FACEBOOK_FEED,
    facebook_feed: items
  }
}

export function unmountHomeState () {
  return {
    type: HOME_UNMOUNT
  }
}

export function getChartDataState (data) {
  return {
    type: GET_CHART_DATA,
    chartData: data.items,
    _need_rebuild_chart: true
  }
}

export function updNeedState (k, v) {
  return {
    type: UPD_NEED,
    _k: k,
    _v: v
  }
}

export function searchItemState (items) {
  return {
    type: SET_ITEM_SUGG,
    item_sugg: items
  }
}

export function setItemState (item) {
  return {
    type: SET_ITEM,
    item_id: item.item_id,
    item_name: item.item_name,
    _need_update_chart: true
  }
}
export function setRegionState (region) {
  return {
    type: SET_REGION,
    region_id: region.region_id,
    region_name: region.region_name,
    _need_update_chart: true
  }
}
export function searchRegionState (items) {
  return {
    type: SET_REGION_SUGG,
    region_sugg: items
  }
}

function resetItemState () {
  return {
    type: RESET_ITEM,
    item_sugg: []
  }
}

function resetRegionState () {
  return {
    type: RESET_REGION_SUGG,
    region_sugg: []
  }
}
