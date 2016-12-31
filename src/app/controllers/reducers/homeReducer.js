import {
	SET_REGION_SUGG,
	SET_REGION,
	RESET_REGION_SUGG,
	SET_ITEM_SUGG,
	RESET_ITEM
} from '../actions/homeActions'

const initialState = {
	region_id: 10000002,
	region_name: "The Forge",
	region_sugg: [],
	item_sugg: [],
	item_id: 34,
	item_name: "Tritanium"
}

export default (state = initialState, action = {}) => {

	switch (action.type) {
		case RESET_ITEM:
		case SET_REGION:
		case SET_ITEM_SUGG:
		case SET_REGION_SUGG:
		case RESET_REGION_SUGG:
			return Object.assign({}, state, action)

		default:
			return state
	}
}