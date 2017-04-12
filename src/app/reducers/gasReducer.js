import * as Gas from "../actions/gasActions";

const initialState = {
  _need_upd_prices: false,
  headTitle: "Gas Sheet",
  headDescription: "Gas in EVE Online, Wormhole GAS, GAS Sites",
  headKeywords: "Amber Cytoserocin, Amber Mykoserocin, Azure Cytoserocin, Azure Mykoserocin, Celadon Cytoserocin, Celadon Mykoserocin, Golden Cytoserocin, Golden Mykoserocin, Lime Cytoserocin, Lime Mykoserocin, Malachite Cytoserocin, Malachite Mykoserocin, Vermillion Cytoserocin, Vermillion Mykoserocin, Viridian Cytoserocin, Viridian Mykoserocin, Fullerite-C28, Fullerite-C32, Fullerite-C320, Fullerite-C50, Fullerite-C540, Fullerite-C60, Fullerite-C70, Fullerite-C72, Fullerite-C84",
  filter: "",
  price_type: "sell",
  list_type: "venture",
  system_id: 30000142,
  system_name: "Jita",
  suggestions: [],
  gas_list: [],
  prices: {
    sell: [],
    buy: []
  }
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case Gas.GAS_GET_PRICES:
    case Gas.GAS_LIST:
    case Gas.GAS_SEARCH_OUTPUT_SYSTEM:
    case Gas.GAS_UPDATE_VARIABLES:
      return Object.assign({}, state, action.payload);
    case Gas.GAS_UNMOUNT:
      return Object.assign({}, state, initialState);
    default:
      return state;
  }
};
