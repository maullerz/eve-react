import * as Planet from '../actions/planetActions'
import {cloneDeep, forEach} from 'lodash'

const initialState = {
  _need_upd_iprices: false,
  _need_upd_oprices: false,
  _need_recalculate: false,
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
  cycle: -1,
  prices: {
    sell: [],
    buy: []
  },
  x: 1
}

export default (state = initialState, action = {}) => {
  switch (action.type) {

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
      console.log(cycle);
      let payload = {
        _need_recalculate: true,
        cycle: cycle
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
