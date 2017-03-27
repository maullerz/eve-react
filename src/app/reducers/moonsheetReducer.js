import * as MoonSheet from "../actions/moonsheetActions";
import { each, find, cloneDeep } from "lodash";

const initialState = {
  _need_recalculate: false,
  _need_upd_price_input: false,
  _need_upd_price_output: false,
  headTitle: "MoonSheet",
  headDescription: "MoonSheet material calculator",
  headKeywords: "",
  reactions: [],
  refined: [],
  price_input_type: "sell",
  price_output_type: "sell",
  filter: "",
  input_system: "Jita",
  output_system: "Jita",
  input_system_id: 30000142,
  output_system_id: 30000142,
  prices: {
    sell: {},
    buy: {}
  },
  // Search
  suggestions_output: [],
  suggestions_input: [],
  items_input: [],
  items_output: [],
  list_type: 'full'
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case MoonSheet.MSHEET_UPDATE_VARIABLE:
    case MoonSheet.MSHEET_GET:
    case MoonSheet.MSHEET_SEARCH_OUTPUT_SYSTEMS:
    case MoonSheet.MSHEET_SEARCH_INPUT_SYSTEMS:
      return Object.assign({}, state, action.payload);
    case MoonSheet.MSHEET_UNMOUNT:
      return Object.assign({}, state, initialState);

    case MoonSheet.MSHEET_GET_PRICES:
      let prices = cloneDeep(state.prices);

      each(prices.sell, (v, k) => {
        let valuePriceSell = find(action.payload.prices.sell, (vv, kk) => {
          return kk === k;
        });
        let valuePriceBuy = find(action.payload.prices.buy, (vv, kk) => {
          return kk === k;
        });
        if (valuePriceSell) {
          prices.sell[k] = valuePriceSell;
        }
        if (valuePriceBuy) {
          prices.buy[k] = valuePriceBuy;
        }
      });
      return Object.assign({}, state, {
        prices: {
          sell: prices.sell,
          buy: prices.buy
        }
      });

    default:
      return state;
  }
};
