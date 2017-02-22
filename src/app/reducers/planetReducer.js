import * as Planet from '../actions/planetActions'
import {cloneDeep, forEach} from 'lodash'

const initialState = {
  _need_upd_iprices: false,
  _need_upd_oprices: false,
  _need_recalculate: false,
  _need_update_headers: false,
  headTitle: "Planet",
  headDescription: "Planet refinery calculator",
  headKeywords: "",
  scheme: {},
  materials: [],
  schemes: {
    1334: [],
    1335: [],
    1336: [],
    1337: []
  },
  titles: {
    1334: 'Processed Planetary Materials',
    1335: 'Refined Planetary Materials',
    1336: 'Specialized Planetary Materials',
    1337: 'Advanced Planetary Materials'
  },
  output_sugg: [],
  input_sugg: [],
  output_system_name: 'Jita',
  output_system_id: 30000142,
  input_system_name: 'Jita',
  input_system_id: 30000142,
  type_price_input: 'sell',
  type_price_output: 'sell',
  output_amount: 0,
  input_amount: 0,
  input_volume: 0,
  output_volume: 0,
  cycle: -1,
  profit: 0,
  prices: {
    sell: [],
    buy: []
  },
  x: 1
}

export default (state = initialState, action = {}) => {
  switch (action.type) {

    case Planet.PLANET_RECALCULATE:
      // calculate volumes materials
      let vMaterials = 0
      let vOutput = 0
      let pInput = 0
      let pOutput = 0
      forEach(cloneDeep(state.materials), v => {
        vMaterials += (state.x * v.volume * v.quantity)
      })
      // volume output items
      vOutput = state.x * state.scheme.quantity * state.scheme.volume
      // prices input
      forEach(cloneDeep(state.materials), v => {
        pInput += state.prices[state.type_price_input][v.item_id] * v.quantity * state.x
      })
      // price output
      pOutput = state.prices[state.type_price_output][state.scheme.typeID] * state.scheme.quantity * state.x

      return Object.assign({}, state, {
        type: Planet.PLANET_RECALCULATE,
        input_volume: vMaterials,
        output_volume: vOutput,
        input_amount: pInput,
        output_amount: pOutput,
        profit: pOutput - pInput
      })

    case Planet.PLANET_UPD_PRICES:

      let pricesSell = cloneDeep(state.prices.sell)
      let pricesBuy = cloneDeep(state.prices.buy)
      let newPrices = action.payload
      forEach(newPrices.sell, (v, k) => {
        pricesSell[k] = v
      })
      forEach(newPrices.buy, (v, k) => {
        pricesBuy[k] = v
      })

      let prices = {
        _need_recalculate: true,
        prices: {
          sell: pricesSell,
          buy: pricesBuy
        }
      }
      return Object.assign({}, state, prices)

    case Planet.PLANET_SET_CYCLE:
      let cycle = action.cycle
      let x = 1

      if(action.cycle.toString() === '-1') {
        x = 1
      } else {
        x = state.scheme.cycle === 3600 ? cycle * 24 :  cycle * 24 * 2
      }
      let payload = {
        _need_recalculate: true,
        cycle: cycle,
        x: x
      }
      return Object.assign({}, state, payload)

    case Planet.PLANET_UPD_FALSE:
    case Planet.PLANET_TYPE_PRICE_OUTPUT:
    case Planet.PLANET_SEARCH_OUTPUT_SYSTEM:
    case Planet.PLANET_GET_SCHEME:
    case Planet.PLANET_SET_OUTPUT_SYSTEM:
    case Planet.PLANET_GET_SCHEMES:
    case Planet.PLANET_RESET_OUTPUT_SUGG:
    case Planet.PLANET_TYPE_PRICE_MATERIALS:
    case Planet.PLANET_TYPE_PRICE_INTPUT:
    case Planet.PLANET_SEARCH_INPUT_SYSTEM:
    case Planet.PLANET_SET_INPUT_SYSTEM:
    case Planet.PLANET_RESET_INPUT_SUGG:
      return Object.assign({}, state, action)

    case Planet.PLANET_UNMOUNT:
      return Object.assign({}, state, initialState)

    default:
      return state
  }
}
