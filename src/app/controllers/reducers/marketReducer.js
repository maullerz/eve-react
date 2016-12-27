import {
  SET_SUGG,
  RESET_SUGG,
  UNMOUNT_MARKET,
  ADD_ITEM,
  SET_SIMILAR
} from '../actions/marketActions'

const initialState = {
  _need_recalculate: false,
  sugg: [],
  items: [],
  similarItems: []
}

export default (state = initialState, action = {}) => {
  switch (action.type) {

    case ADD_ITEM:
      state.items.push(action.new_item)
      return Object.assign({}, state, action)

    case SET_SIMILAR:
    case SET_SUGG:
    case RESET_SUGG:
      return Object.assign({}, state, action)

    case UNMOUNT_MARKET:
      return Object.assign({}, state, initialState)

    default:
      return state
  }
}