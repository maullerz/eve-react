import {MANUFACTURE_SEARCH_BPO, MANUFACTURE_GET_BPC} from '../controllers/actions/manufactureActions'

const initialState = {
  suggestions: [],
  bpc: {},
  bpc_title: ""
}

export default (state = initialState, action = {}) => {
  switch (action.type) {

    case MANUFACTURE_SEARCH_BPO:
      return Object.assign({}, state, {
        suggestions: action.suggestions
      })

    case MANUFACTURE_GET_BPC:
      return Object.assign({}, state, {
        bpc: action.bpc,
        bpc_title: action.bpc_title
      })

    default:
      return state
  }
}

