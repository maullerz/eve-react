import React, {Component} from 'react'
import {connect} from 'react-redux'
import SystemPrice from './SystemPrice'
import Helper from '../../helpers'
import {setTypePrice, changePercentage} from '../../controllers/actions/marketActions'
import {range} from 'lodash'

class Settings extends Component {

  changePriceTypeComponents(typePrice) {
    this.props.setTypePrice(typePrice)
  }

  changePercentage(event) {
    this.props.changePercentage(event.target.value)
  }

  render() {

    let col = {
      left: 'col-md-4',
      right: 'col-md-8'
    }

    let settings = <div className='row'>
      <div className='col-md-12'>
        <table className='inside'>
          <thead>
          <tr>
            <th colSpan='2'>Calculator</th>
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
                <div className={col.left}>Percentage</div>
                <div className={col.right}>
                  <select value={this.props.percentage} onChange={this.changePercentage.bind(this)}>
                    {range(-20, 20, 2).map((val) => {
                      return <option key={val} value={val}>{val} %</option>
                    })}
                  </select>
                </div>
              </div>
              <div className='row'>
                <div className={col.left}>Amount, isk</div>
                <div className={col.right}><span className="txt-yellow">{Helper.price(this.props.amount)}</span></div>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    return this.props.items.length ? settings : null
  }
}

function mapStateToProps(state) {
  return state.marketReducer
}
export default connect(mapStateToProps, {setTypePrice, changePercentage})(Settings);
