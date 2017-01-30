import * as Donate from '../actions/donateActions'

const initialState = {

  headTitle: "Donate",
  headDescription: "If you wish to support the project - just donate some ISK on game characters",
  headKeywords: "",

  title_authors: "If you wish to support the project - just donate some ISK on game characters",
  title_contributors: "Players who have contributed to the project development",
  title_donators: "Players who have donated to the project",
  authors: [],
  contributors: [],
  donators: []
}

export default (state = initialState, action = {}) => {
  switch (action.type) {

    case Donate.SET_LIST:
      return Object.assign({}, state, action)

    case Donate.DONATE_UNMOUNT:
      return Object.assign({}, state, initialState)

    default:
      return state
  }
}
