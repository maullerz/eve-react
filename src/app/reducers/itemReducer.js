import * as Item from '../actions/itemActions'

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
  popular_items: [],
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
    case Item.ITEM_SET:
    case Item.Item.ITEM_SELECT:
    case Item.ITEM_RESET_SUGG:
    case Item.ITEM_SET_PRICES:
    case Item.ITEM_SYSTEM_SET:
    case Item.ITEM_SYSTEM_RESET:
    case Item.ITEM_SEARCH_SYSTEM:
    case Item.ITEM_POPULAR_ITEMS:
    case Item.SET_SIMILAR_ITEMS:
    case Item.ITEM_SET_TYPE_PRICE:
    case Item.ITEM_GET_BY_URL:
    case Item.GET_USED_IN:
      return Object.assign({}, state, action)

    case Item.ITEM_UPDATE_NEED:
      let ns = {}
      ns[action._k] = action._v
      return Object.assign({}, state, ns)

    case Item.ITEM_UNMOUNT:
      return Object.assign({}, state, initialState)

    default:
      return state
  }
}
