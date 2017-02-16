import * as Planet from '../actions/planetActions'

const initialState = {
  headTitle: "Planet",
  headDescription: "Planet refinery calculator",
  headKeywords: ""
}

export default (state = initialState, action = {}) => {
  switch (action.type) {

    case Planet.PLANET_UNMOUNT:
      return Object.assign({}, state, initialState)

    default:
      return state
  }
}
