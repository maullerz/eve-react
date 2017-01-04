import React, {Component} from 'react'
import {connect} from 'react-redux'
import SearchPanel from './../components/market/SearchPanel'
import Settings from './../components/market/Settings'
import Priceall from './../components/market/Priceall'
// import SimilarItems from './../components/market/SimilarItems'
import Items from './../components/market/Items'
import {unmountMarket, updNeed, getPrices} from './actions/marketActions'
import {map} from 'lodash'

class Market extends Component {

  componentWillReceiveProps (np) {
    if (np._need_upd_prices) {
      this.props.updNeed('_need_upd_prices', false)
      this.props.getPrices(np.system_id, map(np.items, 'item_id'))
    }
  }
  componentWillUnmount () {
    this.props.unmountMarket()
  }

  render () {
    return (
      <div>
        <SearchPanel />
        <div className='row'>
          <div className='col-md-4 t-a_l col-first'>
            <Settings />
            <Priceall />
            {/* <SimilarItems /> */}
          </div>
          <div className='col-md-8 t-a_l col-last'>
            <Items />
          </div>
        </div>
      </div>
    )
  }
}
function mapStateToProps (state) {
  return state.marketReducer
}
export default connect(mapStateToProps, {unmountMarket, updNeed, getPrices})(Market)
