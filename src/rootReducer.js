import { combineReducers } from 'redux'
import manufactureReducer from './app/reducers/manufactureReducer'
import marketReducer from './app/reducers/marketReducer'
import homeReducer from './app/reducers/homeReducer'
import itemReducer from './app/reducers/itemReducer'
import appReducer from './app/reducers/appReducer'
import donateReducer from './app/reducers/donateReducer'

export default combineReducers({
  appReducer,
  manufactureReducer,
  marketReducer,
  homeReducer,
  itemReducer,
  donateReducer
})
