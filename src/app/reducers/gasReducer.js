import * as Gas from '../actions/gasActions'

const initialState = {

  headTitle: "Gas Sheet",
  headDescription: "",
  headKeywords: "",
  filter: "",
  price_type: "sell",
  list_type: "short",
  system_id: 30000142,
  system_name: "Jita",
  suggestions: [],
  gas_list: []

}

export default (state = initialState, action = {}) => {
  switch (action.type) {

    case Gas.GAS_LIST:
    case Gas.GAS_SEARCH_OUTPUT_SYSTEM:
    case Gas.GAS_UPDATE_VARIABLES:
      return Object.assign({}, state, action.payload);
    case Gas.GAS_UNMOUNT:
      return Object.assign({}, state, initialState)
    default:
      return state
  }
}
