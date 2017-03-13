import * as Moon from '../actions/moonActions'
import {cloneDeep, forEach} from 'lodash'

const initialState = {
  _need_upd_iprices: false,
  _need_upd_oprices: false,
  _need_recalculate: false,
  _need_update_headers: false,
  headTitle: "Moon",
  headDescription: "Moon material calculator",
  headKeywords: "",
  scheme: {},
  materials: [],
  schemes: {
    499: [],
    500: [],
    501: []
  },
  titles: {
    499: 'Advanced Moon Materials',
    500: 'Processed Moon Materials',
    501: 'Raw Moon Materials'
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

    case Moon.MOON_RECALCULATE:
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
      pOutput = state.prices[state.type_price_output][state.scheme.item_id] * state.scheme.quantity * state.x

      return Object.assign({}, state, {
        type: Moon.MOON_RECALCULATE,
        input_volume: vMaterials,
        output_volume: vOutput,
        input_amount: pInput,
        output_amount: pOutput,
        profit: pOutput - pInput
      })

    case Moon.MOON_UPD_PRICES:
      // console.warn('MOON_UPD_PRICES')
      return {
        ...state,
        prices: {
          sell: {
            ...state.prices.sell,
            ...action.payload.sell,
          },
          buy: {
            ...state.prices.buy,
            ...action.payload.buy,
          }
        }
      }

      // legacy:
      // let pricesSell = cloneDeep(state.prices.sell)
      // let pricesBuy = cloneDeep(state.prices.buy)
      // let newPrices = action.payload
      // forEach(newPrices.sell, (v, k) => {
      //   pricesSell[k] = v
      // })
      // forEach(newPrices.buy, (v, k) => {
      //   pricesBuy[k] = v
      // })

      // let prices = {
      //   _need_recalculate: true,
      //   prices: {
      //     sell: pricesSell,
      //     buy: pricesBuy
      //   }
      // }
      // return Object.assign({}, state, prices)

    case Moon.MOON_SET_CYCLE:
      let cycle = action.cycle
      let x = cycle.toString() === '-1' ? 1 : cycle * 24
      let payload = {
        _need_recalculate: true,
        cycle: cycle,
        x: x
      }
      return Object.assign({}, state, payload)

    case Moon.MOON_UPD_FALSE:
    case Moon.MOON_TYPE_PRICE_OUTPUT:
    case Moon.MOON_SEARCH_OUTPUT_SYSTEM:
    case Moon.MOON_GET_SCHEME:
    case Moon.MOON_SET_OUTPUT_SYSTEM:
    case Moon.MOON_GET_SCHEMES:
    case Moon.MOON_RESET_OUTPUT_SUGG:
    case Moon.MOON_TYPE_PRICE_INTPUT:
    case Moon.MOON_SEARCH_INPUT_SYSTEM:
    case Moon.MOON_SET_INPUT_SYSTEM:
    case Moon.MOON_RESET_INPUT_SUGG:
      return Object.assign({}, state, action)

    case Moon.MOON_UNMOUNT:
      return Object.assign({}, state, initialState)

    default:
      return state
  }
}
