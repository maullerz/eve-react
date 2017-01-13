import { SET_LIST } from '../actions/donateActions'
import { forEach } from "lodash"

const initialState = {
  authors: {
    title: 'If you wish to support the project - just donate some ISK on game characters',
    list: []
  },
  contribute: {
    title: 'Players who have contributed to the project development',
    list: []
  },
  donators: {
    title: 'Players who have donated to the project',
    list: []
  }
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_LIST:
      let authors = []
      forEach(action.payload.authors, function (val, index) {
        authors.push({
          char_id: index,
          char_name: val.name,
          description: val.about
        })
      })
      let newState = {
        authors: {
          list: authors
        },
        // contribute: {
        //   list: action.payload.left
        // },
        // donators: {
        //   list: action.payload.right
        // }
      }
      let list = {

      }
      console.log(state)
      return Object.assign({}, state, Object.assign({}, newState, )

    default:
      return state
  }
}
