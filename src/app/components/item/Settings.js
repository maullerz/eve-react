import React, {Component} from 'react'
import {connect} from 'react-redux'
import SystemPrice from './SystemPrice'
import Helper from '../../helpers'
import {setTypePrice} from '../../actions/itemActions'
// import {cloneDeep, each} from 'lodash'

class Settings extends Component {

  changePriceTypeComponents(typePrice) {
    this.props.setTypePrice(typePrice)
  }

  render() {
    let col = {
      left: 'col-md-4',
      right: 'col-md-8'
    }

    let items = <div className='row'>
      <div className='col-md-12'>
        <table className='inside'>
          <thead>
          <tr>
            <th colSpan='2'>{this.props.item.item_name}</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td colSpan='2' className='inside-table'>
              <div className='row'>
                <div className={col.left}>Orders system, isk</div>
                <div className={col.right}>
                  <SystemPrice />
                  <div className='btn-group'>
                    <button onClick={this.changePriceTypeComponents.bind(this, 'sell')}
                            className={this.props.type_price === 'sell' ? 'active' : ''}>sell
                    </button>
                    <button onClick={this.changePriceTypeComponents.bind(this, 'buy')}
                            className={this.props.type_price === 'buy' ? 'active' : ''}>buy
                    </button>
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className={col.left}>Volume</div>
                <div className={col.right}>{Helper.price(this.props.item.volume)} m3</div>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>

    return this.props.item.hasOwnProperty("item_id") ? items : null
  }
}

export default connect(state => state.itemReducer, {setTypePrice})(Settings)
