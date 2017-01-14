import {
  ITEM_SET,
  ITEM_UNMOUNT,
  ITEM_SELECT,
  ITEM_RESET_SUGG,
  ITEM_SET_TYPE_PRICE,
  ITEM_SEARCH_SYSTEM,
  ITEM_SYSTEM_SET,
  ITEM_SYSTEM_RESET,
  ITEM_GET_BY_URL,
  ITEM_UPDATE_NEED,
  ITEM_SET_PRICES,
  GET_USED_IN,
  SET_SIMILAR_ITEMS
} from '../actions/itemActions'

const initialState = {
  headTitle: "Where the component is used",
  headDescription: "Components are available, but you don't know what you can build with them? Our component database will help you",
  headKeywords: "eve online, eve items, eve database, eve manufacturing calculator",

  _need_get_bpc: false,
  _need_update_prices: false,
  _need_get_similar_items: false,
  item_sugg: [],
  system_sugg: [],
  similar_items: [],
  used_in: [],
  item: {},
  type_price: 'sell',
  prices: {
    sell: {},
    buy: {}
  },
  page: 1,
  limit: 15,
  total_pages: 1,
  total_items: 1,
  system_id: 30000142
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case ITEM_SET:
    case ITEM_SELECT:
    case ITEM_RESET_SUGG:
    case ITEM_SET_PRICES:
    case ITEM_SYSTEM_SET:
    case ITEM_SYSTEM_RESET:
    case ITEM_SEARCH_SYSTEM:
    case SET_SIMILAR_ITEMS:
    case ITEM_SET_TYPE_PRICE:
    case ITEM_GET_BY_URL:
    case GET_USED_IN:
      return Object.assign({}, state, action)

    case ITEM_UPDATE_NEED:
      let ns = {}
      ns[action._k] = action._v
      return Object.assign({}, state, ns)

    case ITEM_UNMOUNT:
      return Object.assign({}, state, initialState)

    default:
      return state
  }
}
