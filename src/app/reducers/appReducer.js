import * as ACT from '../actions/appActions'

const initialState = {
  loader: false,
  headTitle: "EVE-Prod.",
  headDescription: "Manufacturing calculator and market monitoring for EVE Online will teach and help you to earn ISK easily and quickly!",
  headKeywords: "eve online, eve market, market monitoring, trade, eve central"
}

export default (state = initialState, action = {}) => {

  switch (action.type) {
    case ACT.CHANGE_HEAD:
    case ACT.CHANGE_LOADER:
      return Object.assign({}, state, action)

    default:
      return state
  }
}
