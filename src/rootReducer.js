import {combineReducers} from 'redux'
import manufactureReducer from './app/controllers/reducers/manufactureReducer'
import marketReducer from './app/controllers/reducers/marketReducer'

export default combineReducers({
  manufactureReducer, marketReducer
})
