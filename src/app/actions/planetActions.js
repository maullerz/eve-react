import Api from '../api'
import {forEach} from 'lodash'
export const PLANET_UNMOUNT = 'PLANET_UNMOUNT'
export const PLANET_GET_SCHEMES = 'PLANET_GET_SCHEMES'
export const PLANET_GET_SCHEME = 'PLANET_GET_SCHEME'
export const PLANET_TYPE_PRICE_OUTPUT = 'PLANET_TYPE_PRICE_OUTPUT'
export const PLANET_TYPE_PRICE_MATERIALS = 'PLANET_TYPE_PRICE_MATERIALS'
export const PLANET_SEARCH_OUTPUT_SYSTEM = 'PLANET_SEARCH_OUTPUT_SYSTEM'
export const PLANET_SET_OUTPUT_SYSTEM = 'PLANET_SET_OUTPUT_SYSTEM'
export const PLANET_RESET_OUTPUT_SUGG = 'PLANET_RESET_OUTPUT_SUGG'
export const PLANET_TYPE_PRICE_INTPUT = 'PLANET_TYPE_PRICE_INTPUT'

export const PLANET_SEARCH_INPUT_SYSTEM = 'PLANET_SEARCH_INPUT_SYSTEM'
export const PLANET_SET_INPUT_SYSTEM = 'PLANET_SET_INPUT_SYSTEM'
export const PLANET_RESET_INPUT_SUGG = 'PLANET_RESET_INPUT_SUGG'
export const PLANET_SET_CYCLE = 'PLANET_SET_CYCLE'
export const PLANET_UPD_FALSE = 'PLANET_UPD_FALSE'
export const PLANET_UPD_PRICES = 'PLANET_UPD_PRICES'


export function updPrice(system_id, items) {
  return dispatch => {
    return Api.Main.prices(system_id, items.join(','))
    .then(json => {
      dispatch({
        type: PLANET_UPD_PRICES,
        payload: json.data.prices
      })
    })
  }
}

export function updFalse(variable) {
  return dispatch => {
    let dispatched = {
      type: PLANET_UPD_FALSE
    }
    dispatched[variable] = false
    return dispatch(dispatched)
  }
}

export function changeCycle(cycle) {
  return dispatch => {
    return dispatch({
      type: PLANET_SET_CYCLE,
      cycle: cycle
    })
  }
}
export function resetInputSugg() {
  return dispatch => {
    return dispatch({
      type: PLANET_RESET_INPUT_SUGG,
      input_sugg: []
    })
  }
}
export function resetOutputSugg() {
  return dispatch => {
    return dispatch({
      type: PLANET_RESET_OUTPUT_SUGG,
      output_sugg: []
    })
  }
}

export function setOutputSystem(system) {
  return dispatch => {
    return dispatch({
      type: PLANET_SET_OUTPUT_SYSTEM,
      output_system_name: system.system_name,
      output_system_id: system.system_id,
      _need_upd_oprices: true,
    })
  }
}

export function setInputSystem(system) {
  return dispatch => {
    return dispatch({
      type: PLANET_SET_INPUT_SYSTEM,
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
        type: PLANET_SEARCH_OUTPUT_SYSTEM,
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
        type: PLANET_SEARCH_INPUT_SYSTEM,
        input_sugg: json.data.items
      })
    })
  }
}

export function changePriceTypeOutput(type) {
  return dispatch => {
    return dispatch({
      type: PLANET_TYPE_PRICE_OUTPUT,
      type_price_output: type,
      _need_recalculate: true
    })
  }
}

export function changePriceTypeInput(type) {
  return dispatch => {
    return dispatch({
      type: PLANET_TYPE_PRICE_INTPUT,
      type_price_input: type,
      _need_recalculate: true
    })
  }
}

export function getSchemes() {
  return dispatch => {
    Api.Planet.schemes().then((schemes) => {
      return dispatch({
        type: PLANET_GET_SCHEMES,
        schemes: schemes.data
      })
    })
  }
}

export function getScheme(url) {
  return dispatch => {
    Api.Planet.schema(url).then((scheme) => {

      let keys = {}
      keys[scheme.data.typeID] = 0
      forEach(scheme.data.materials, v => {
        keys[v.item_id] = 0
      })
      return dispatch({
        type: PLANET_GET_SCHEME,
        scheme: scheme.data,
        materials: scheme.data.materials,
        prices: {
          sell: keys,
          buy: keys
        },
        _need_upd_iprices: true,
        _need_upd_oprices: true
      })
    })
  }
}

export function unmountPlanet() {
  return dispatch => {
    return dispatch({
      type: PLANET_UNMOUNT
    })
  }
}