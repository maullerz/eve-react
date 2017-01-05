import {combineReducers} from 'redux'
import manufactureReducer from './app/controllers/reducers/manufactureReducer'
import marketReducer from './app/controllers/reducers/marketReducer'
import homeReducer from './app/controllers/reducers/homeReducer'
import itemReducer from './app/controllers/reducers/itemReducer'

export default combineReducers({
  manufactureReducer,
  marketReducer,
  homeReducer,
  itemReducer
})
