import axios from 'axios';
import {item_api} from './../api';
import {
  SET_SIMILAR_ITEMS,
  SET_USEDIN_ITEMS,
  SET_ACTIVE_ITEM
} from './types';

export function getSimilarItems(item_id) {
  return dispatch => {
    return axios
    .get(item_api.get_similar_items + item_id)
    .then((res) => {
      dispatch(setSimilarItems(res.data.items));
    });
  };
}

export function getUsedInItems(item_id, page) {
  return dispatch => {
    return axios
    .get(item_api.get_usedin_item + 'page=' + page + '&limit=15&component_id=' + item_id)
    .then((res) => {
      dispatch(setUsedInItems(res.data));
    });
  };
}

export function setSimilarItems(items) {
  return {
    type: SET_SIMILAR_ITEMS,
    items: items
  };
}

export function setUsedInItems(items) {
  return {
    type: SET_USEDIN_ITEMS,
    items: items
  };
}

export function setActiveItem(id, name, url) {
  return {
    type: SET_ACTIVE_ITEM,
    active_item: {
      id: id,
      name: name,
      url: url
    }
  };
}