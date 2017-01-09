import {
  SEARCH_BPC,
  GET_BPC,
  RESET_SEARCH,
  CHANGE_ME,
  CHANGE_RUN,
  CHANGE_TE,
  RECALCULATE_MANUFACTURE,
  SET_BPC_COST,
  CHANGE_TYPE_PRICE_ITEM,
  CHANGE_TYPE_PRICE_COMPONENTS,
  SEARCH_MANUFACTURE_SYSTEM,
  SET_MANUFACTURE_SYSTEM,
  SEARCH_COMPONENT_SYSTEM,
  RESET_COMPONENT_SYSTEM,
  SET_COMPONENTS_PRICES,
  SET_ITEM_PRICE,
  RESET_SYSTEM_ITEM,
  SEARCH_ITEM_SYSTEM,
  UNMOUNT_MANUFACTURE,
  SET_FACILITY,
  SET_FACILITY_VAL
} from '../actions/manufactureActions'

const initialState = {
  _need_update_prices_item: false,
  _need_update_prices_components: false,
  _need_recalculate: false,

  suggestions: [],
  // system manufacture suggestions
  sm_sugg: [],
  costIndex: 0,
  sm_systemType: '',
  sm_system_id: 0,
  sm_system_name: '',
  stationFee: 0,
  adjustCost: 0,

  bpc: {},
  bpc_title: '',
  used_in: [],
  bpc_components: [],
  // decryptors: [],
  item: {},
  price_items: {},
  prices: {
    sell: {},
    buy: {}
  },
  item_amount: 0,
  components_amount: 0,
  components_volume: 0,
  me: 10,
  te: 10,
  run: 1,
  output: 0,
  timeRun: 0,
  origin_bpc_components: [],
  profit: 0,
  bpc_cost: 0,
  total: 0,
  type_p_item: 'sell',
  type_p_components: 'sell',
  // search section
  pcsystem_id: 30000142,
  pcsystem_name: 'Jita',
  pcs_sugg: [],
  pis_sugg: [],
  pisystem_id: 30000142,
  pisystem_name: 'Jita',
  facility: [],
  facility_val: {
    me: 1,
    te: 1
  }
}

export default (state = initialState, action = {}) => {
  switch (action.type) {

    case SET_FACILITY:
    case SET_FACILITY_VAL:
    case RESET_SYSTEM_ITEM:
    case SEARCH_ITEM_SYSTEM:
    case SET_ITEM_PRICE:
    case SET_COMPONENTS_PRICES:
    case RESET_COMPONENT_SYSTEM:
    case SET_MANUFACTURE_SYSTEM:
    case SEARCH_COMPONENT_SYSTEM:
    case SEARCH_MANUFACTURE_SYSTEM:
    case CHANGE_TYPE_PRICE_ITEM:
    case CHANGE_TYPE_PRICE_COMPONENTS:
    case SET_BPC_COST:
    case RECALCULATE_MANUFACTURE:
    case CHANGE_RUN:
    case CHANGE_TE:
    case CHANGE_ME:
    case SEARCH_BPC:
    case RESET_SEARCH:
    case GET_BPC:
      return Object.assign({}, state, action)

    case UNMOUNT_MANUFACTURE:
      return Object.assign({}, initialState)

    default:
      return state
  }
}
