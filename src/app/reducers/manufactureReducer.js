import {
  MANUFACTURE_SEARCH_BPO
} from '../actions/types';

const initialState = {
  suggestions: []
};

export default (state = initialState, action = {}) => {

  switch (action.type) {
    case MANUFACTURE_SEARCH_BPO:
      return Object.assign({}, state, {
        suggestions: action.items
      });
    default:
      return state;
  }
}