import * as PlanetSheet from "../actions/planetSheetActions";
import {each, find, cloneDeep} from "lodash";

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
  p_sell: {},
  p_buy: {},
  // Search
  suggestions_output: [],
  suggestions_input: [],
  items_input: [],
  items_output: [],
  list_type: 'full'
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case PlanetSheet.PSHEET_UPDATE_VARIABLES:
      return Object.assign({}, state, action.payload);
    case PlanetSheet.PSHEET_UNMOUNT:
      return Object.assign({}, state, initialState);
    default:
      return state;
  }
};
