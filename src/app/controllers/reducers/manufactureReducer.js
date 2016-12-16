import {
  SEARCH_BPC,
  GET_BPC,
  RESET_SEARCH,
  GET_PRICES,
  SET_COMPONENTS_AMOUNT,
  CHANGE_ME,
  CHANGE_RUN,
  CHANGE_TE,
  RECALCULATE_MANUFACTURE,
  SET_BPC_COST,
  CHANGE_TYPE_PRICE_ITEM,
  CHANGE_TYPE_PRICE_COMPONENTS
} from '../actions/manufactureActions'
import {zipObject, range} from 'lodash'

const initialState = {
  _init: false,
  _init_calculator: false,
  suggestions: [],
  bpc: {},
  bpc_title: '',
  used_in: [],
  bpc_components: [],
  decryptors: [],
  item: {},
  price_items: [],
  prices: {
    sell: {},
    buy: {}
  },
  item_amount: 0,
  components_amount: 0,
  components_volume: 0,
  me: 10,
  te: 10,
  run: 1,
  output: 0,
  origin_bpc_components: [],
  profit: 0,
  bpc_cost: 0,
  total: 0,
  type_p_item: 'sell',
  type_p_components: 'sell'
}

export default (state = initialState, action = {}) => {
  switch (action.type) {

    case CHANGE_TYPE_PRICE_ITEM:
    case CHANGE_TYPE_PRICE_COMPONENTS:
    case SET_BPC_COST:
    case RECALCULATE_MANUFACTURE:
    case CHANGE_RUN:
    case CHANGE_TE:
    case CHANGE_ME:
    case GET_PRICES:
    case SEARCH_BPC:
    case RESET_SEARCH:
    case SET_COMPONENTS_AMOUNT:
      return Object.assign({}, state, action)

    case GET_BPC:

      let formatedPrices = zipObject(action.price_items, range(0, action.price_items.length, 0))
      return Object.assign({}, state, {
        bpc: action.bpc,
        bpc_title: action.bpc.blueprint_name,
        used_in: action.used_in,
        bpc_components: action.bpc_components,
        origin_bpc_components: action.bpc_components,
        decryptors: action.decryptors,
        item: action.item,
        price_items: action.price_items,
        prices: {
          sell: formatedPrices,
          buy: formatedPrices
        },
        components_amount: 0,
        item_amount: 0,
        _init: false,
        _init_calculator: false,
      })

    default:
      return state
  }
}

