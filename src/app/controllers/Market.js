import React, {Component} from 'react'
import {connect} from 'react-redux'
import SearchMarketItem from '../components/market/SearchMarketItem'
import Settings from './../components/market/Settings'
import Priceall from './../components/market/Priceall'
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
        <SearchMarketItem />
        <div className='row'>
          <div className='col-md-4 t-a_l col-first'>
            <Settings />
            <Priceall />
          </div>
          <div className='col-md-8 t-a_l col-last'>
            <Items />
          </div>
        </div>
      </div>
    )
  }
}
export default connect(state => state.marketReducer, {unmountMarket, updNeed, getPrices})(Market)
