import {
  SET_SIMILAR_ITEMS,
  SET_USEDIN_ITEMS,
  SET_ACTIVE_ITEM
} from '../actions/types';

const initialState = {
  active_item: {
    id: '',
    name: '',
    url: ''
  },
  used_in_items: {
    total_items: 0,
    items: []
  },
  items: []
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_SIMILAR_ITEMS:
      return Object.assign({}, state, {
        items: action.items
      });
    case SET_USEDIN_ITEMS:

      return Object.assign({}, state, {
        used_in_items: action.items
      });
    case SET_ACTIVE_ITEM:
      return Object.assign({}, state, {
        active_item: action.active_item
      });
    default:
      return state;
  }
}