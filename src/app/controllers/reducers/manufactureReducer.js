import {
  SEARCH_BPC,
  GET_BPC,
  RESET_SEARCH,
  GET_PRICES,
  SET_COMPONENTS_AMOUNT
} from '../actions/manufactureActions'
import {zipObject, range} from "lodash"

const initialState = {
  suggestions: [],
  bpc: {},
  bpc_title: "",
  used_in: [],
  bpc_components: [],
  decryptors: [],
  item: {},
  price_items: [],
  prices: {
    sell: {},
    buy: {}
  },
  components_amount: 0
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

      let formatedPrices = zipObject(action.price_items, range(0, action.price_items.length, 0));

      return Object.assign({}, state, {
        bpc: action.bpc,
        bpc_title: action.bpc.blueprint_name,
        used_in: action.used_in,
        bpc_components: action.bpc_components,
        decryptors: action.decryptors,
        item: action.item,
        price_items: action.price_items,
        prices: {
          sell: formatedPrices,
          buy: formatedPrices
        },
        components_amount: 0
      })

    case RESET_SEARCH: {
      return Object.assign({}, state, action)
    }

    case SET_COMPONENTS_AMOUNT: {
      return Object.assign({}, state, action)
    }

    default:
      return state
  }
}

