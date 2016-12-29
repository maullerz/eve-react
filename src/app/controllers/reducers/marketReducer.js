import {findIndex, cloneDeep} from 'lodash'
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
  SET_QTY
} from '../actions/marketActions'

const initialState = {
  _need_recalculate: false,
  type_price: 'sell',
  system_id: 30000142,
  percentage: 0,
  amount: 0,
  sugg: [],
  items: [],
  similarItems: [],
  s_sugg: []
}

export default (state = initialState, action = {}) => {
  switch (action.type) {

    case UNSET_SYSTEM_SUGG:
    case SET_SIMILAR:
    case SET_SUGG:
    case SET_SYSTEM_ID:
    case RESET_SUGG:
    case SET_PERCENTAGE:
    case SET_TYPE_PRICES:
    case SET_SYSTEM_SUGG:
      return Object.assign({}, state, action)

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

    case UNMOUNT_MARKET:
      return Object.assign({}, state, initialState)

    default:
      return state
  }
}