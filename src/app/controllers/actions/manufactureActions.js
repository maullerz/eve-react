import ApiService from './../../api'
import {forEach, cloneDeep, ceil} from "lodash"
import Helper from "../../helpers"

export const SEARCH_BPC = 'SEARCH_BPC'
export const GET_BPC = 'GET_BPC'
export const RESET_SEARCH = 'RESET_SEARCH'
export const GET_PRICES = 'GET_PRICES'
export const SET_COMPONENTS_AMOUNT = 'SET_COMPONENTS_AMOUNT'
export const CHANGE_ME = 'CHANGE_ME'
export const CHANGE_TE = 'CHANGE_TE'
export const CHANGE_RUN = 'CHANGE_RUN'
export const RECALCULATE_MANUFACTURE = 'RECALCULATE_MANUFACTURE'
export const SET_BPC_COST = 'SET_BPC_COST'
export const CHANGE_TYPE_PRICE_COMPONENTS = 'CHANGE_TYPE_PRICE_COMPONENTS'
export const CHANGE_TYPE_PRICE_ITEM = 'CHANGE_TYPE_PRICE_ITEM'

// autocomplete search bpc
export function searchBpc(term) {
  return dispatch => {
    return ApiService.Manufacture.searchBpc(term)
    .then((res) => {
      dispatch(setAutocompleteItems(res.data.items))
    })
  }
}

// get bpc by url
export function getBpc(url) {
  return dispatch => {
    return ApiService.Manufacture.getBpc(url)
    .then((res) => {
      dispatch(setBlueprint(res.data))
    })
  }
}

// get prices
export function getPrices(system_id, items) {
  return dispatch => {
    return ApiService.Main.prices(system_id, items)
    .then((json) => {
      dispatch(setPrices(json.data.prices))
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
export function changeRun(run, output_per_cycle) {
  return dispatch => {
    return dispatch(updateRun(run, output_per_cycle))
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

// dispatch
export function updateRun(run) {
  return {
    type: CHANGE_RUN,
    run: run
  }
}

// dispatch
export function updateMe(me) {
  return {
    type: CHANGE_ME,
    me: me
  }
}

// dispatch
export function updateTe(te) {
  return {
    type: CHANGE_TE,
    te: te
  }
}

export function setBpcCost(cost) {
  return {
    type: SET_BPC_COST,
    bpc_cost: cost
  }
}

// dispatch
export function setPrices(prices) {
  return {
    type: GET_PRICES,
    prices: prices,
    _init: true
  }
}
// dispatch
export function setPriceTypeItem(type) {
  return {
    type: CHANGE_TYPE_PRICE_ITEM,
    type_p_item: type
  }
}
// dispatch
export function setPriceTypeComponents(type) {
  return {
    type: CHANGE_TYPE_PRICE_COMPONENTS,
    type_p_components: type
  }
}

// dispatch
export function setBlueprint(response) {
  return {
    type: GET_BPC,
    bpc: response.bpc,
    used_in: response.used_in,
    bpc_components: response.bpc_components,
    decryptors: response.decryptors,
    item: response.item,
    price_items: response.price_items,
    prices: {
      sell: {},
      buy: {}
    }
  }
}

// dispatch
// Update manufacture when have changes
export function updateManufacture(props) {

  let bpcc = cloneDeep(props.origin_bpc_components)
  let percentage = (100 - +props.me) / 100
  let amount = 0
  let volume = 0
  let item_amount = props.prices[props.type_p_item][props.bpc.productTypeID] * props.run

  forEach(bpcc, val => {
    // calculate new QTY
    let qty = val.orig_qty !== 1 ? ceil(val.orig_qty * props.run * percentage) : val.orig_qty * props.run
    val.orig_qty = qty
    // total amount
    amount += qty * props.prices[props.type_p_components][val.item_id]
    // total volume
    volume += qty * val.volume
  });
  // cost components, bpc, other
  let manufactureCost = amount + (props.bpc_cost * props.run)

  return {
    type: RECALCULATE_MANUFACTURE,
    bpc_components: bpcc,
    components_amount: amount,
    components_volume: Helper.price(volume),
    item_amount: item_amount,
    profit: item_amount - manufactureCost,
    output: props.run * props.bpc.output,
    _init_calculator: true,
    total: manufactureCost
  }
}
// dispatch
export function setAutocompleteItems(suggestions) {
  return {
    type: SEARCH_BPC,
    suggestions: suggestions
  }
}
// dispatch
export function unsetSearch() {
  return {
    type: RESET_SEARCH,
    suggestions: []
  }
}
