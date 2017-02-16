import * as Ore from '../actions/oreActions'

const initialState = {
  headTitle: "Ore",
  headDescription: "Ore refinery calculator",
  headKeywords: ""
}

export default (state = initialState, action = {}) => {
  switch (action.type) {

    case Ore.ORE_UNMOUNT:
      return Object.assign({}, state, initialState)

    default:
      return state
  }
}
