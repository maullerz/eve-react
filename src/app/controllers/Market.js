import React from 'react';
import { connect } from 'react-redux';
import SearchMarketItem from '../components/market/SearchMarketItem';
import Settings from './../components/market/Settings';
import Items from './../components/market/Items';
import { unmountMarket, updNeed, getPrices } from '../actions/marketActions';
import { map } from 'lodash';
import { setHead } from '../actions/appActions';

class Market extends React.Component {
  componentWillReceiveProps(np) {
    if (np._need_upd_prices) {
      this.props.updNeed('_need_upd_prices', false);
      this.props.getPrices(np.system_id, map(np.items, 'item_id'));
    }
  }

  componentWillMount() {
    this.props.setHead({
      headTitle: this.props.headTitle,
      headDescription: this.props.headDescription,
      headKeywords: this.props.headKeywords
    });
  }

  componentWillUnmount() {
    this.props.unmountMarket();
  }

  render() {
    return (
      <div>
        <SearchMarketItem />
        <div className="row">
          <div className="col-md-4 t-a_l col-first">
            <Settings />
          </div>
          <div className="col-md-8 t-a_l col-last">
            <Items />
          </div>
        </div>
      </div>
    );
  }
}
export default connect(state => state.marketReducer, { unmountMarket, updNeed, getPrices, setHead })(Market);
