import * as PlanetSheet from "../actions/planetSheetActions";
//import {each, find, cloneDeep} from "lodash";

const initialState = {
  _need_recalculate: false,
  _need_upd_price_input: false,
  _need_upd_price_output: false,
  headTitle: "PlanetSheet",
  headDescription: "PlanetSheet material calculator",
  headKeywords: "",
  schemes: [],
  price_input_type: "sell",
  price_output_type: "sell",
  filter: "",
  input_system: "Jita",
  output_system: "Jita",
  input_system_id: 30000142,
  output_system_id: 30000142,
  // Search
  suggestions_output: [],
  suggestions_input: [],
  items_input: [],
  items_output: [],
  input_prices: {
    sell: {},
    buy: {}
  },
  output_prices: {
    sell: {},
    buy: {}
  },
  list_type: 'full'
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case PlanetSheet.PSHEET_GET_PRICES:
      let upd = {}
      if (action.payload.typeItems === 'input') {
        upd['input_prices'] = action.payload.prices
      } else if (action.payload.typeItems === 'output') {
        upd['output_prices'] = action.payload.prices
      }
      return Object.assign({}, state, upd);

    case PlanetSheet.PSHEET_SEARCH_INPUT_SYSTEMS:
    case PlanetSheet.PSHEET_SEARCH_OUTPUT_SYSTEMS:
    case PlanetSheet.PSHEET_GET:
    case PlanetSheet.PSHEET_UPDATE_VARIABLES:
      return Object.assign({}, state, action.payload);
    case PlanetSheet.PSHEET_UNMOUNT:
      return Object.assign({}, state, initialState);
    default:
      return state;
  }
};
