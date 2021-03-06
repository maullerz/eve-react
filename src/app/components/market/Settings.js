import React, { Component } from 'react';
import { connect } from 'react-redux';
import SystemPrice from './SystemPrice';
import { setTypePrice, changePercentage } from '../../actions/marketActions';
import { range, cloneDeep, each } from 'lodash';

class Settings extends Component {
  changePriceTypeComponents(typePrice) {
    this.props.setTypePrice(typePrice);
  }

  changePercentage(event) {
    this.props.changePercentage(event.target.value);
  }

  calculateTotalAmount() {
    let prices = cloneDeep(this.props.prices[this.props.type_price]);
    let amount = 0;

    each(this.props.items, function(val) {
      amount += +val.qty * +prices[val.item_id];
    });
    return amount;
  }

  render() {
    let col = {
      left: 'col-md-4',
      right: 'col-md-8'
    };
    let settings = (
      <div className="row">
        <div className="col-md-12">
          <table className="inside">
            <thead>
              <tr>
                <th colSpan="2">Calculator</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="2" className="inside-table">
                  <div className="row">
                    <div className={col.left}>Orders system, isk</div>
                    <div className={col.right}>
                      <SystemPrice />
                      <div className="btn-group">
                        <button
                          onClick={this.changePriceTypeComponents.bind(this, 'sell')}
                          className={this.props.type_price === 'sell' ? 'active' : ''}
                        >
                          sell
                        </button>
                        <button
                          onClick={this.changePriceTypeComponents.bind(this, 'buy')}
                          className={this.props.type_price === 'buy' ? 'active' : ''}
                        >
                          buy
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className={col.left}>Percentage</div>
                    <div className={col.right}>
                      <select value={this.props.percentage} onChange={this.changePercentage.bind(this)}>
                        {range(-20, 22, 2).map(val => {
                          return <option key={val} value={val}>{val} %</option>;
                        })}
                      </select>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
    return this.props.items.length ? settings : null;
  }
}
export default connect(state => state.marketReducer, { setTypePrice, changePercentage })(Settings);
