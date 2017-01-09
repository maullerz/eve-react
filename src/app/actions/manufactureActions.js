import ApiService from './../api'
import {forEach, cloneDeep, ceil, map} from 'lodash'
import Helper from '../helpers'

export const SEARCH_BPC = 'SEARCH_BPC'
export const GET_BPC = 'GET_BPC'
export const RESET_SEARCH = 'RESET_SEARCH'
export const CHANGE_ME = 'CHANGE_ME'
export const CHANGE_TE = 'CHANGE_TE'
export const CHANGE_RUN = 'CHANGE_RUN'
export const RECALCULATE_MANUFACTURE = 'RECALCULATE_MANUFACTURE'
export const SET_BPC_COST = 'SET_BPC_COST'
export const CHANGE_TYPE_PRICE_COMPONENTS = 'CHANGE_TYPE_PRICE_COMPONENTS'
export const CHANGE_TYPE_PRICE_ITEM = 'CHANGE_TYPE_PRICE_ITEM'
export const SEARCH_MANUFACTURE_SYSTEM = 'SEARCH_MANUFACTURE_SYSTEM'
export const SET_MANUFACTURE_SYSTEM = 'SET_MANUFACTURE_SYSTEM'
export const RESET_MANUFACTURE_SUGGESTIONS = 'RESET_MANUFACTURE_SUGGESTIONS'
export const SEARCH_COMPONENT_SYSTEM = 'SEARCH_COMPONENT_SYSTEM'
export const RESET_COMPONENT_SYSTEM = 'RESET_COMPONENT_SYSTEM'
export const SET_COMPONENTS_PRICES = 'SET_COMPONENTS_PRICES'
export const SET_ITEM_PRICE = 'SET_ITEM_PRICE'
export const SEARCH_ITEM_SYSTEM = 'SEARCH_ITEM_SYSTEM'
export const RESET_SYSTEM_ITEM = 'RESET_SYSTEM_ITEM'
export const UNMOUNT_MANUFACTURE = 'UNMOUNT_MANUFACTURE'
export const SET_FACILITY = 'SET_FACILITY'
export const SET_FACILITY_VAL = 'SET_FACILITY_VAL'

export function unmountManufacture() {
  return dispatch => {
    dispatch(unmountManufactureState())
  }
}

export function setFacilityVal(me, te) {
  return dispatch => {
    dispatch(updFacilityVal(me, te))
  }
}

export function updFacilityVal(me, te) {
  return {
    type: SET_FACILITY_VAL,
    facility_val: {
      me: me,
      te: te
    },
    _need_recalculate: true
  }
}

export function getFacilities(activityID) {
  return dispatch => {
    return ApiService.Main.facilities(activityID)
      .then(json => {
        dispatch(setFacility(json.data.items))
      })
  }
}

export function setComponentsSystem(systemId, props) {
  let componentsIds = map(props.bpc_components, 'item_id').join(',')
  return dispatch => {
    return ApiService.Main.prices(systemId, componentsIds)
      .then(json => {
        dispatch(setComponentsPrices(json.data, props))
      })
  }
}
export function setItemSystem(systemId, props) {
  return dispatch => {
    return ApiService.Main.prices(systemId, props.item.item_id)
      .then(json => {
        dispatch(setItemPrice(json.data, props))
      })
  }
}
export function searchItemSystem(term) {
  return dispatch => {
    return ApiService.Search.system(term)
      .then(json => {
        dispatch(setItemSystemSuggestions(json.data.items))
      })
  }
}
export function searchComponentsSystem(term) {
  return dispatch => {
    return ApiService.Search.system(term)
      .then(json => {
        dispatch(setComponentsSystemSuggestions(json.data.items))
      })
  }
}
export function resetManufactureSystemSuggestions() {
  return dispatch => {
    return dispatch(unsetManufactureSystemSuggestions())
  }
}
export function resetSystemItemSuggestions() {
  return dispatch => {
    return dispatch(unsetSystemItemSuggestions())
  }
}
export function setManufactureSystem(system) {
  return dispatch => {
    return dispatch(updateManufactureSystem(system))
  }
}
// autocomplete search manufacture system
export function searchManufactureSystem(term) {
  return dispatch => {
    return ApiService.Search.system(term)
      .then(json => {
        dispatch(setManufactureSystemSuggestions(json.data.items))
      })
  }
}
// autocomplete search bpc
export function searchBpc(term) {
  return dispatch => {
    return ApiService.Manufacture.searchBpc(term)
      .then(res => {
        dispatch(setAutocompleteItems(res.data.items))
      })
  }
}

// get bpc by url
export function getBpc(url) {
  return dispatch => {
    return ApiService.Manufacture.getBpc(url)
      .then((res) => {
        dispatch(setBpc(res.data))
      })
  }
}

// get te
export function changeTe(te) {
  return dispatch => {
    return dispatch(updateTe(te))
  }
}

// get me
export function changeMe(me) {
  return dispatch => {
    return dispatch(updateMe(me))
  }
}

// change cost bpc
export function changeBpcCost(cost) {
  return dispatch => {
    return dispatch(setBpcCost(cost))
  }
}

// change price type item
export function changePriceTypeItem(type) {
  return dispatch => {
    return dispatch(setPriceTypeItem(type))
  }
}

// change price type component
export function changePriceTypeComponents(type) {
  return dispatch => {
    return dispatch(setPriceTypeComponents(type))
  }
}

// change run
export function changeRun(run, outputPerCycle) {
  return dispatch => {
    return dispatch(updateRun(run, outputPerCycle))
  }
}

// reset system components
export function resetSystemComponentsSuggestions() {
  return dispatch => {
    return dispatch(unsetSystemComponentsSuggestions())
  }
}
// reset suggestions
export function resetSearch() {
  return dispatch => {
    return dispatch(unsetSearch())
  }
}

// recalculate all manufacture when change props
export function recalculateManufacture(props) {
  return dispatch => {
    return dispatch(updateManufacture(props))
  }
}

// DISPATCHING FUNCTIONS
export function updateManufactureSystem(system) {
  return {
    type: SET_MANUFACTURE_SYSTEM,
    costIndex: system.costIndex,
    sm_systemType: system.systemType,
    sm_system_id: system.system_id,
    sm_system_name: system.system_name,
    sm_sugg: [],
    stationFee: system.systemType === 'NPC' ? 1.1 : 1,
    _need_recalculate: true
  }
}

// dispatch
export function setComponentsPrices(prices, props) {
  let pricesSell = cloneDeep(props.prices.sell)
  let pricesBuy = cloneDeep(props.prices.buy)

  forEach(map(props.bpc_components, 'item_id'), (v) => {
    pricesSell[v] = prices.prices['sell'][v]
    pricesBuy[v] = prices.prices['buy'][v]
  })

  return {
    type: SET_COMPONENTS_PRICES,
    prices: {
      sell: pricesSell,
      buy: pricesBuy
    },
    pcsystem_id: prices.system_id,
    _need_recalculate: true,
    _need_update_prices_components: false
  }
}

export function setItemPrice(prices, props) {
  let pricesSell = cloneDeep(props.prices.sell)
  let pricesBuy = cloneDeep(props.prices.buy)

  pricesSell[props.item.item_id] = prices.prices['sell'][props.item.item_id]
  pricesBuy[props.item.item_id] = prices.prices['buy'][props.item.item_id]

  return {
    type: SET_ITEM_PRICE,
    prices: {
      sell: pricesSell,
      buy: pricesBuy
    },
    pisystem_id: prices.system_id,
    _need_recalculate: true,
    _need_update_prices_item: false
  }
}

// dispatch
export function updateRun(run) {
  return {
    type: CHANGE_RUN,
    run: run,
    _need_recalculate: true
  }
}
export function updateMe(me) {
  return {
    type: CHANGE_ME,
    me: me,
    _need_recalculate: true
  }
}
export function updateTe(te) {
  return {
    type: CHANGE_TE,
    te: te,
    _need_recalculate: true
  }
}

export function setBpcCost(cost) {
  return {
    type: SET_BPC_COST,
    bpc_cost: cost,
    _need_recalculate: true
  }
}

// dispatch
export function setPriceTypeItem(type) {
  return {
    type: CHANGE_TYPE_PRICE_ITEM,
    type_p_item: type,
    _need_recalculate: true
  }
}
// dispatch
export function setPriceTypeComponents(type) {
  return {
    type: CHANGE_TYPE_PRICE_COMPONENTS,
    type_p_components: type,
    _need_recalculate: true
  }
}

// dispatch
export function setBpc(response) {
  let priceItems = response.price_items
  return {
    type: GET_BPC,
    bpc: response.bpc,
    bpc_title: response.bpc.blueprint_name,
    used_in: response.used_in,
    bpc_components: response.bpc_components,
    origin_bpc_components: cloneDeep(response.bpc_components),
    item: response.item,
    price_items: priceItems,
    prices: {
      sell: cloneDeep(priceItems),
      buy: cloneDeep(priceItems)
    },
    item_amount: 0,
    components_amount: 0,
    components_volume: 0,
    _need_recalculate: false,
    _need_update_prices_item: true,
    _need_update_prices_components: true
  }
}

// dispatch
// Update manufacture when have changes
export function updateManufacture(props) {
  let oldProps = cloneDeep(props)
  let bpcc = oldProps.origin_bpc_components
  let percentage = (100 - +props.me) / 100
  let percentageTe = (100 - +props.te) / 100
  let amount = 0
  let volume = 0
  let baseCost = 0
  let itemAmount = oldProps.prices[oldProps.type_p_item][oldProps.item.item_id] * oldProps.run
  let timeRun = percentageTe * props.bpc.productionTime * props.facility_val.te * props.run

  forEach(bpcc, val => {
    // calculate new QTY

    let adjustQty = cloneDeep(val)
    let qty = val.orig_qty !== 1 ? val.orig_qty * percentage : val.orig_qty
    // station me
    val.orig_qty = ceil(qty * props.run * props.facility_val.me)

    // total amount
    amount += Math.ceil(qty) * props.prices[props.type_p_components][val.item_id]
    // total volume
    volume += Math.ceil(qty) * val.volume
    // total base cost
    baseCost += +val.adjustPrice * adjustQty.orig_qty
  })

  // adust cost for run in facility
  let adjustCost = Math.ceil(baseCost * (props.costIndex + 1) * props.stationFee) * props.run

  // cost components, bpc, other
  let manufactureCost = amount + (props.bpc_cost * props.run) + adjustCost

  return {
    type: RECALCULATE_MANUFACTURE,
    bpc_components: bpcc,
    components_amount: amount,
    components_volume: Helper.price(volume),
    item_amount: itemAmount,
    profit: itemAmount - manufactureCost,
    output: props.run * props.bpc.output,
    total: manufactureCost,
    adjustCost: adjustCost,
    timeRun: Helper.toHHMMSS(timeRun),
    _need_recalculate: false
  }
}

export function unmountManufactureState() {
  return {
    type: UNMOUNT_MANUFACTURE
  }
}

export function setFacility(facilities) {
  return {
    type: SET_FACILITY,
    facility: facilities
  }
}

// SEARCH section dispatchers
export function setAutocompleteItems(suggestions) {
  return {
    type: SEARCH_BPC,
    suggestions: suggestions
  }
}
export function setItemSystemSuggestions(systems) {
  return {
    type: SEARCH_ITEM_SYSTEM,
    pis_sugg: systems
  }
}
export function setManufactureSystemSuggestions(systems) {
  return {
    type: SEARCH_MANUFACTURE_SYSTEM,
    sm_sugg: systems
  }
}
export function setComponentsSystemSuggestions(systems) {
  return {
    type: SEARCH_COMPONENT_SYSTEM,
    pcs_sugg: systems
  }
}
export function unsetSearch() {
  return {
    type: RESET_SEARCH,
    suggestions: []
  }
}
export function unsetSystemItemSuggestions() {
  return {
    type: RESET_SYSTEM_ITEM,
    pis_sugg: []
  }
}
export function unsetManufactureSystemSuggestions() {
  return {
    type: RESET_MANUFACTURE_SUGGESTIONS,
    sm_sugg: []
  }
}
export function unsetSystemComponentsSuggestions() {
  return {
    type: RESET_COMPONENT_SYSTEM,
    pcs_sugg: []
  }
}
