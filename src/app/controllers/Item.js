import React, {Component} from 'react'
import {connect} from 'react-redux'
import SearchItemPanel from '../components/item/SearchItemPanel'
import {unmountItem, getComponentByUrl, updNeed, getPrices, getBpcByComponent} from '../actions/itemActions'
import Settings from './../components/item/Settings'
import UsedIn from './../components/item/UsedIn'


class Item extends Component {

  componentWillReceiveProps(np) {

    if (np._need_update_prices) {
      this.props.updNeed('_need_update_prices', false)
      this.props.getPrices(np.item.item_id, np.system_id)
    }

    if (np._need_get_bpc) {
      this.props.updNeed('_need_get_bpc', false)
      this.props.getBpcByComponent(np.item.item_id, np.page, np.limit)
    }
  }

  componentWillMount() {
    if (this.props.params.url && !this.props.item.item_id) {
      this.props.getComponentByUrl(this.props.params.url)
    }
  }

  componentWillUnmount() {
    this.props.unmountItem()
  }

  render() {
    return (
      <div>
        <SearchItemPanel />

        <div className='row'>
          <div className='col-md-4 t-a_l col-first'>
            <Settings />
          </div>
          <div className='col-md-8 t-a_l col-last'>
            <UsedIn />
          </div>
        </div>
      </div>
    )
  }
}
export default connect(state => state.itemReducer, {
  unmountItem,
  getComponentByUrl,
  updNeed,
  getPrices,
  getBpcByComponent
})(Item)