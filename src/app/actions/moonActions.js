import Api from '../api'
import {forEach} from 'lodash'
export const MOON_UNMOUNT = 'MOON_UNMOUNT'
export const MOON_GET_SCHEMES = 'MOON_GET_SCHEMES'
export const MOON_GET_SCHEME = 'MOON_GET_SCHEME'
export const MOON_TYPE_PRICE_OUTPUT = 'MOON_TYPE_PRICE_OUTPUT'
export const MOON_SEARCH_OUTPUT_SYSTEM = 'MOON_SEARCH_OUTPUT_SYSTEM'
export const MOON_SET_OUTPUT_SYSTEM = 'MOON_SET_OUTPUT_SYSTEM'
export const MOON_RESET_OUTPUT_SUGG = 'MOON_RESET_OUTPUT_SUGG'
export const MOON_TYPE_PRICE_INTPUT = 'MOON_TYPE_PRICE_INTPUT'

export const MOON_SEARCH_INPUT_SYSTEM = 'MOON_SEARCH_INPUT_SYSTEM'
export const MOON_SET_INPUT_SYSTEM = 'MOON_SET_INPUT_SYSTEM'
export const MOON_RESET_INPUT_SUGG = 'MOON_RESET_INPUT_SUGG'
export const MOON_SET_CYCLE = 'MOON_SET_CYCLE'
export const MOON_UPD_FALSE = 'MOON_UPD_FALSE'
export const MOON_UPD_PRICES = 'MOON_UPD_PRICES'
export const MOON_RECALCULATE = 'MOON_RECALCULATE'


export function recalculate() {
  return dispatch => {
    return dispatch({
      type: MOON_RECALCULATE
    })
  }
}

export function updPrice(system_id, items) {
  return dispatch => {
    return Api.Main.prices(system_id, items.join(','))
    .then(json => {
      dispatch({
        type: MOON_UPD_PRICES,
        payload: json.data.prices
      })
    })
  }
}

export function updFalse(variable) {
  return dispatch => {
    let dispatched = {
      type: MOON_UPD_FALSE
    }
    dispatched[variable] = false
    return dispatch(dispatched)
  }
}

export function changeCycle(cycle) {
  return dispatch => {
    return dispatch({
      type: MOON_SET_CYCLE,
      cycle: cycle
    })
  }
}
export function resetInputSugg() {
  return dispatch => {
    return dispatch({
      type: MOON_RESET_INPUT_SUGG,
      input_sugg: []
    })
  }
}
export function resetOutputSugg() {
  return dispatch => {
    return dispatch({
      type: MOON_RESET_OUTPUT_SUGG,
      output_sugg: []
    })
  }
}

export function setOutputSystem(system) {
  return dispatch => {
    return dispatch({
      type: MOON_SET_OUTPUT_SYSTEM,
      output_system_name: system.system_name,
      output_system_id: system.system_id,
      _need_upd_oprices: true,
    })
  }
}

export function setInputSystem(system) {
  return dispatch => {
    return dispatch({
      type: MOON_SET_INPUT_SYSTEM,
      input_system_name: system.system_name,
      input_system_id: system.system_id,
      _need_upd_iprices: true,
    })
  }
}

export function searchOutputSystem(term) {
  return dispatch => {
    return Api.Search.system(term)
    .then(json => {
      dispatch({
        type: MOON_SEARCH_OUTPUT_SYSTEM,
        output_sugg: json.data.items
      })
    })
  }
}

export function searchInputSystem(term) {
  return dispatch => {
    return Api.Search.system(term)
    .then(json => {
      dispatch({
        type: MOON_SEARCH_INPUT_SYSTEM,
        input_sugg: json.data.items
      })
    })
  }
}

export function changePriceTypeOutput(type) {
  return dispatch => {
    return dispatch({
      type: MOON_TYPE_PRICE_OUTPUT,
      type_price_output: type,
      _need_recalculate: true
    })
  }
}

export function changePriceTypeInput(type) {
  return dispatch => {
    return dispatch({
      type: MOON_TYPE_PRICE_INTPUT,
      type_price_input: type,
      _need_recalculate: true
    })
  }
}

export function getSchemes() {
  return dispatch => {
    Api.Moon.schemes().then(schemes => {
      return dispatch({
        type: MOON_GET_SCHEMES,
        schemes: schemes.data
      })
    })
  }
}

export function getScheme(url) {
  return dispatch => {
    Api.Moon.schema(url).then((scheme) => {
      let keys = {}
      keys[scheme.data.item_id] = 0
      forEach(scheme.data.materials, v => {
        keys[v.item_id] = 0
      })
      return dispatch({
        type: MOON_GET_SCHEME,
        scheme: scheme.data,
        materials: scheme.data.materials,
        prices: {
          sell: keys,
          buy: keys
        },
        _need_upd_iprices: true,
        _need_upd_oprices: true,
        _need_update_headers: true
      })
    })
  }
}

export function unmountMoon() {
  return dispatch => {
    return dispatch({
      type: MOON_UNMOUNT
    })
  }
}