// import {findIndex, cloneDeep, each, reject} from 'lodash'
import {
  ITEM_SET,
  ITEM_UNMOUNT
} from '../actions/itemActions'

const initialState = {
  item_sugg: []
}

export default (state = initialState, action = {}) => {
  console.log(state)

  switch (action.type) {

    case ITEM_SET:
      return Object.assign({}, state, action)

    case ITEM_UNMOUNT:
      return Object.assign({}, state, initialState)

    default:
      return state
  }
}
