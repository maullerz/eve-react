import {
  SET_SUGG,
  RESET_SUGG,
  UNMOUNT_MARKET
} from '../actions/marketActions'

const initialState = {
  _need_recalculate: false,
  sugg: []
}

export default (state = initialState, action = {}) => {
  switch (action.type) {

    case SET_SUGG:
    case RESET_SUGG:
      return Object.assign({}, state, action)

    case UNMOUNT_MARKET:
      return Object.assign({}, state, initialState)

    default:
      return state
  }
}