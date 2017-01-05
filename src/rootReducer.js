import {combineReducers} from 'redux'
import manufactureReducer from './app/reducers/manufactureReducer'
import marketReducer from './app/reducers/marketReducer'
import homeReducer from './app/reducers/homeReducer'
import itemReducer from './app/reducers/itemReducer'

export default combineReducers({
  manufactureReducer,
  marketReducer,
  homeReducer,
  itemReducer
})
