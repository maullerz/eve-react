import { CHANGE_HEAD } from '../actions/appActions'

const initialState = {
  headTitle: "EVE-Prod.",
  headDescription: "EVE-Prod. DESC",
  headKeywords: "eve-online, blueprint calculator, minerals, trade, market"
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case CHANGE_HEAD:
      return { ...state, action }

    default:
      return state
  }
}
