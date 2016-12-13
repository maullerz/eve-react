import {SEARCH_BPC, GET_BPC, RESET_SEARCH, GET_PRICES} from '../controllers/actions/manufactureActions'

const initialState = {
  suggestions: [],
  bpc: {},
  bpc_title: "",
  used_in: [],
  bpc_components: [],
  decryptors: [],
  item: {},
  price_items: [],
  prices: {}
}

export default (state = initialState, action = {}) => {

  switch (action.type) {

    case GET_PRICES: {
      return Object.assign({}, state, {
        prices: action.prices
      })
    }
    case SEARCH_BPC:
      return Object.assign({}, state, action)

    case GET_BPC:
      return Object.assign({}, state, {
        bpc: action.bpc,
        bpc_title: action.bpc.blueprint_name,
        used_in: action.used_in,
        bpc_components: action.bpc_components,
        decryptors: action.decryptors,
        item: action.item,
        price_items: action.price_items
      })

    case RESET_SEARCH: {
      return Object.assign({}, state, action)
    }

    default:
      return state
  }
}

