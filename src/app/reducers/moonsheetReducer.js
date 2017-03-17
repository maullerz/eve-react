import * as MoonSheet from "../actions/moonsheetActions";

const initialState = {
  _need_recalculate: false,
  headTitle: "MoonSheet",
  headDescription: "MoonSheet material calculator",
  headKeywords: "",
  reactions: [],
  refined: [],
  price_type: "sell",
  filter: ""
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case MoonSheet.MSHEET_UPDATE_VARIABLE:
    case MoonSheet.MSHEET_GET:
      return Object.assign({}, state, action.payload);
    case MoonSheet.MSHEET_UNMOUNT:
      return Object.assign({}, state, initialState);

    default:
      return state;
  }
};
