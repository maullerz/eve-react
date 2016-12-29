import React, {Component} from 'react'
import {connect} from 'react-redux'
import SearchPanel from './../components/market/SearchPanel'
import Settings from './../components/market/Settings'
// import SimilarItems from './../components/market/SimilarItems'
import Items from './../components/market/Items'
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
          <div className='col-md-4 t-a_l col-first'>
            <Settings />
            {/*<SimilarItems />*/}
          </div>
          <div className='col-md-8 t-a_l col-last'>
            <Items />
          </div>
        </div>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return state.marketReducer
}
export default connect(mapStateToProps, {unmountMarket})(Market)
