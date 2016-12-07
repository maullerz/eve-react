import {
  SEARCH_BPC,
  GET_BPC,
  RESET_SEARCH
} from '../controllers/actions/manufactureActions'

const initialState = {
  suggestions: [],
  bpc: {},
  bpc_title: ""
}

export default (state = initialState, action = {}) => {

  switch (action.type) {

    case SEARCH_BPC:
      return Object.assign({}, state, action)

    case GET_BPC:
      return Object.assign({}, state, action)

    case RESET_SEARCH: {
      return Object.assign({}, state, action)
    }

    default:
      return state
  }
}

