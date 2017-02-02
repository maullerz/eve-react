import { findIndex, cloneDeep, each, reject } from 'lodash'
import * as Market from './../actions/marketActions'

const initialState = {
  headTitle: "Market",
  headDescription: "Market help you see orders in other systems",
  headKeywords: "eve online, eve items, eve market",

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
  s_sugg: []
}

export default (state = initialState, action = {}) => {
  switch (action.type) {

    case Market.UNMOUNT_MARKET:
      return Object.assign({}, initialState)

    case Market.UNSET_SYSTEM_SUGG:
    case Market.MARKET_SET_SUGG:
    case Market.SET_SYSTEM_ID:
    case Market.RESET_SUGG:
    case Market.SET_TYPE_PRICES:
    case Market.SET_SYSTEM_SUGG:
      return Object.assign({}, state, action)

    case Market.GET_PRICES:

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

    case Market.REMOVE_ITEM:
      let withoutItem = reject(state.items, v => {
        return v.item_id === action._item
      })
      return Object.assign({}, state, { items: withoutItem })

    case Market.SET_PERCENTAGE:
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

    case Market.UPDATE_NEED:
      let upd = {}
      upd[action.key] = action.val
      return Object.assign({}, state, upd)

    case Market.SET_QTY:

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

    case Market.ADD_ITEM:
      let stateItems = cloneDeep(state.items)

      let iindex = findIndex(stateItems, v => {
        return +v.item_id === +action.item_id
      })
      if (iindex === -1) {
        stateItems.push(action.new_item)
      }
      return Object.assign({}, state, { items: stateItems, _need_upd_prices: true })

    case Market.GET_BODY:
      let stateItemsBody = cloneDeep(state.items)
      if (action._new_items.length) {
        
        action._new_items.forEach(item => {
          let index = findIndex(stateItemsBody, function (i) {
            return +i.item_id === +item.item_id
          })
          if (index === -1) {
            stateItemsBody.push(item)
          } else {
            stateItemsBody[index].qty = item.qty
          }
        })
      }
      return Object.assign({}, state, { items: stateItemsBody, _need_upd_prices: true })

    default:
      return state
  }
}
