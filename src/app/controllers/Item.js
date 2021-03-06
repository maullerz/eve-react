import React, { Component } from 'react'
import { connect } from 'react-redux'
import SearchItemPanel from '../components/item/SearchItemPanel'
import { unmountItem, getComponentByUrl, getPopularItems, updNeed, getPrices, getBpcByComponent, getSimilarItems } from '../actions/itemActions'
import { setHead } from '../actions/appActions'
import UsedIn from './../components/item/UsedIn'
import SimilarItems from '../components/item/SimilarItems'
import PopularItems from '../components/item/PopularItems'

class Item extends Component {

  componentWillReceiveProps(np) {
    if (np._need_update_prices) {
      this.props.updNeed('_need_update_prices', false)
      this.props.getPrices(np.item.item_id, np.system_id)
    }

    if (np._need_get_bpc) {
      this.props.updNeed('_need_get_bpc', false)
      this.props.updNeed('_need_get_similar_items', false)
      this.props.getBpcByComponent(np.item.item_id, np.page, np.limit)
    }

    if (np._need_get_similar_items) {
      this.props.updNeed('_need_get_similar_items', false)
      this.props.getSimilarItems(np.item.item_id)
    }

    if (np.item && np.item.item_id !== this.props.item.item_id) {
      this.props.setHead({
        headTitle: this.props.headTitle + ", " + np.item.item_name,
        headDescription: this.props.headDescription,
        headKeywords: this.props.headKeywords + ", eve " + np.item.item_name.toLowerCase()
      })
    }
  }

  componentWillMount() {
    if (this.props.params.url && !this.props.item.item_id) {
      this.props.getComponentByUrl(this.props.params.url)
    }
    this.props.setHead({
      headTitle: this.props.headTitle,
      headDescription: this.props.headDescription,
      headKeywords: this.props.headKeywords
    })
    this.props.getPopularItems();
  }

  componentWillUnmount() {
    this.props.unmountItem()
  }

  render() {
    return (
      <div>
        <SearchItemPanel />
        <div className='row'>
          <div className='col-md-4 col-sm-4 t-a_l col-first'>
            <SimilarItems />
          </div>
          <div className='col-md-8 col-sm-8 t-a_l col-last'>
            <UsedIn />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 col-sm-12">
            <PopularItems items={this.props.popular_items} />
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
  getBpcByComponent,
  getSimilarItems,
  setHead,
  getPopularItems
})(Item)
