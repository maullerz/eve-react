import Item_api from './../api';
import {
  MANUFACTURE_SEARCH_BPO
} from './types';

export function searchBpo(term) {
  return dispatch => {
    return Item_api.Manufacture.searchBpc(term)
    .then((res) => {
      dispatch(setSearchItems(res.data.items));
    });
  };
}

export function getBlueprint(url) {
  return dispatch => {
    return Item_api.Manufacture.getBpo(url)
    .then((res) => {
      dispatch(setBlueprint(res.data.item));
    });
  };
}

export function getSearchItems(items) {
  return {
    type: MANUFACTURE_SEARCH_BPO,
    items: items
  };
}

export function setSearchItems(items) {
  return {
    type: MANUFACTURE_SEARCH_BPO,
    items: items
  };
}
