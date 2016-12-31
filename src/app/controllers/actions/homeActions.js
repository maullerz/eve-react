import ApiService from './../../api'

export const SET_REGION_SUGG = 'SET_SUGG'
export const SET_REGION = 'SET_REGION'
export const RESET_REGION_SUGG = 'RESET_REGION_SUGG'
export const SET_ITEM_SUGG = 'SET_ITEM_SUGG'
export const SET_ITEM = 'SET_ITEM'
export const RESET_ITEM = 'RESET_ITEM'

export function searchItem(term) {
	return dispatch => {
		return ApiService.Search.item(term).then(json => {
			dispatch(searchItemState(json.data.items))
		})
	}
}

export function resetItem() {
	return dispatch => {
		dispatch(resetItemState())
	}
}

export function searchItemState(items) {
	return {
		type: SET_ITEM_SUGG,
		item_sugg: items
	}
}

export function searchRegion(term) {
	return dispatch => {
		return ApiService.Search.region(term).then(json => {
			dispatch(searchRegionState(json.data.items))
		})
	}
}
export function setRegion(region) {
	return dispatch => {
		dispatch(setRegionState(region))
	}
}
export function setItem(item) {
	return dispatch => {
		dispatch(setItemState(item))
	}
}
export function resetRegion() {
	return dispatch => {
		dispatch(resetRegionState())
	}
}
export function setItemState(item) {
	return {
		type: SET_ITEM,
		item_id: item.item_id,
		item_name: item.item_name,
	}
}
export function setRegionState(region) {
	return {
		type: SET_REGION,
		region_id: region.region_id,
		region_name: region.region_name,
	}
}
export function searchRegionState(items) {
	return {
		type: SET_REGION_SUGG,
		region_sugg: items
	}
}

function resetItemState() {
	return {
		type: RESET_ITEM,
		item_sugg: []
	}
}

function resetRegionState() {
	return {
		type: RESET_REGION_SUGG,
		region_sugg: []
	}
}