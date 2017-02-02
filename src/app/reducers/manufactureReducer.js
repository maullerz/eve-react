import * as Bpc from '../actions/manufactureActions'

const initialState = {
  headTitle: "Manufacturing calculator",
  headDescription: "Manufacturing calculator",
  headKeywords: "manufacturing calculator, eve online, bpc calculator",

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

    case Bpc.SET_FACILITY:
    case Bpc.SET_FACILITY_VAL:
    case Bpc.RESET_SYSTEM_ITEM:
    case Bpc.SEARCH_ITEM_SYSTEM:
    case Bpc.SET_ITEM_PRICE:
    case Bpc.SET_COMPONENTS_PRICES:
    case Bpc.RESET_COMPONENT_SYSTEM:
    case Bpc.SET_MANUFACTURE_SYSTEM:
    case Bpc.SEARCH_COMPONENT_SYSTEM:
    case Bpc.SEARCH_MANUFACTURE_SYSTEM:
    case Bpc.CHANGE_TYPE_PRICE_ITEM:
    case Bpc.CHANGE_TYPE_PRICE_COMPONENTS:
    case Bpc.SET_BPC_COST:
    case Bpc.RECALCULATE_MANUFACTURE:
    case Bpc.CHANGE_RUN:
    case Bpc.CHANGE_TE:
    case Bpc.CHANGE_ME:
    case Bpc.SEARCH_BPC:
    case Bpc.RESET_SEARCH:
    case Bpc.GET_BPC:
      return Object.assign({}, state, action)

    case Bpc.UNMOUNT_MANUFACTURE:
      return Object.assign({}, initialState)

    default:
      return state
  }
}
