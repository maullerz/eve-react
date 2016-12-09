import {
  SEARCH_BPC,
  GET_BPC,
  RESET_SEARCH
} from '../controllers/actions/manufactureActions'

const initialState = {
  suggestions: [],
  manufacture: {},
  bpc_title: "",
  used_in: []
}

export default (state = initialState, action = {}) => {

  switch (action.type) {

    case SEARCH_BPC:
      return Object.assign({}, state, action)

    case GET_BPC:
      return Object.assign({}, state, {manufacture: action.manufacture, used_in: action.used_in})

    case RESET_SEARCH: {
      return Object.assign({}, state, action)
    }

    default:
      return state
  }
}

