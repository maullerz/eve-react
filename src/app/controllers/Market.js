import React, {Component} from 'react'
import {connect} from 'react-redux'
import SearchPanel from './../components/market/SearchPanel'
import {unmountMarket} from './actions/marketActions'

class Market extends Component {

  componentWillUnmount() {
    this.props.unmountMarket()
  }

  render() {
    return (
      <div>
        <SearchPanel />
        <div className='row'>
          <div className='col-md-6 t-a_l col-first'>
            sdsd
          </div>
          <div className='col-md-6 t-a_l col-last'>
            ds
          </div>
        </div>
      </div>
    )
  }
}
function mapStateToProps(state) {
  console.log(state.marketReducer)
  //return state.marketReducer
}
export default connect(mapStateToProps, {unmountMarket})(Market)
