import {
  SET_REGION_SUGG,
  SET_REGION,
  RESET_REGION_SUGG,
  SET_ITEM_SUGG,
  RESET_ITEM,
  UPD_NEED,
  SET_ITEM,
  GET_CHART_DATA
} from '../actions/homeActions'

const initialState = {
  _need_update_chart: false,
  region_id: 10000002,
  region_name: "The Forge",
  region_sugg: [],
  item_sugg: [],
  item_id: 34,
  item_name: "Tritanium",
  chartData: []
}

export default (state = initialState, action = {}) => {

  switch (action.type) {
    case GET_CHART_DATA:
    case RESET_ITEM:
    case SET_REGION:
    case SET_ITEM:
    case SET_ITEM_SUGG:
    case SET_REGION_SUGG:
    case RESET_REGION_SUGG:
      return Object.assign({}, state, action)

    case UPD_NEED:
      let ns = {}
      ns[action._k] = action._v
      return Object.assign({}, state, ns)

    default:
      return state
  }
}