import { SET_LIST, DONATE_UNMOUNT } from '../actions/donateActions'

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
    
    case SET_LIST:
      return Object.assign({}, state, action)

    case DONATE_UNMOUNT:
      return Object.assign({}, state, initialState)

    default:
      return state
  }
}
