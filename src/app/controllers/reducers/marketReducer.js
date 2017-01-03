import {findIndex, cloneDeep, each, reject} from 'lodash'
import {
  SET_SUGG,
  RESET_SUGG,
  UNMOUNT_MARKET,
  ADD_ITEM,
  SET_SIMILAR,
  SET_TYPE_PRICES,
  SET_PERCENTAGE,
  SET_SYSTEM_SUGG,
  SET_SYSTEM_ID,
  UNSET_SYSTEM_SUGG,
  SET_QTY,
  UPDATE_NEED,
  GET_PRICES,
  REMOVE_ITEM
} from '../actions/marketActions'

const initialState = {
  _need_recalculate: false,
  _need_upd_prices: false,
  type_price: 'sell',
  system_id: 30000142,
  percentage: 0,
  amount: 0,
  sugg: [],
  items: [],
  prices: {
    sell: [],
    buy: []
  },
  orig_prices: {
    sell: [],
    buy: []
  },
  similarItems: [],
  s_sugg: []
}

export default (state = initialState, action = {}) => {
  switch (action.type) {

    case UNMOUNT_MARKET:
      return Object.assign({}, initialState, {items: []})

    case UNSET_SYSTEM_SUGG:
    case SET_SIMILAR:
    case SET_SUGG:
    case SET_SYSTEM_ID:
    case RESET_SUGG:
    case SET_TYPE_PRICES:
    case SET_SYSTEM_SUGG:
      return Object.assign({}, state, action)

    case GET_PRICES:

      let s = cloneDeep(action.orig_prices.sell)
      let b = cloneDeep(action.orig_prices.buy)

      let nps = {}
      let npb = {}

      each(s, (p, i) => {
        nps[i] = p * (1 + (state.percentage / 100))
      })

      each(b, (p, i) => {
        npb[i] = p * (1 + (state.percentage / 100))
      })

      let updatedPrices = {
        prices: {
          sell: nps,
          buy: npb
        },
        orig_prices: action.orig_prices
      }
      return Object.assign({}, state, updatedPrices)

    case REMOVE_ITEM:
      let withoutItem = reject(state.items, v => {
        return v.item_id === action._item
      })
      return Object.assign({}, state, {items: withoutItem})

    case SET_PERCENTAGE:
      let sell = cloneDeep(state.orig_prices.sell)
      let buy = cloneDeep(state.orig_prices.buy)
      let newSell = {}
      let newBuy = {}

      each(sell, function (p, i) {
        newSell[i] = p * (1 + (action.percentage / 100))
      })
      each(buy, function (p, i) {
        newBuy[i] = p * (1 + (action.percentage / 100))
      })

      let changedAction = {
        prices: {
          sell: newSell,
          buy: newBuy
        },
        percentage: action.percentage
      }
      return Object.assign({}, state, changedAction)

    case UPDATE_NEED:
      let upd = {}
      upd[action.key] = action.val
      return Object.assign({}, state, upd)

    case SET_QTY:

      let items = cloneDeep(state.items)
      let index = findIndex(items, v => {
        return v.item_id === action._item_id
      })
      if (index !== -1) {
        items[index].qty = action._qty
      }
      return Object.assign({}, state, {
        items: items
      })

    case ADD_ITEM:
      state.items.push(action.new_item)
      return Object.assign({}, state, action)

    default:
      return state
  }
}
