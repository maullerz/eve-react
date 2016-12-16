import React, {Component} from 'react'
import {connect} from 'react-redux'
import Helper from '../../helpers'
import {
  changeMe,
  changeRun,
  changeTe,
  changeBpcCost,
  recalculateManufacture,
  changePriceTypeItem,
  changePriceTypeComponents
} from '../../controllers/actions/manufactureActions'

class Calculator extends Component {

  componentWillReceiveProps(np) {
    // if changes selectors - update calculator values
    if (np.run !== this.props.run || np.me !== this.props.me || np.bpc_cost !== this.props.bpc_cost || np.te !== this.props.te) {
      this.props.recalculateManufacture(np)
    }
    if(np.type_p_item !== this.props.type_p_item || np.type_p_components !== this.props.type_p_components) {
      this.props.recalculateManufacture(np)
    }
  }

  changePriceTypeItem(event) {
    this.props.changePriceTypeItem(event.target.value)
  }
  changePriceTypeComponents(event) {
    this.props.changePriceTypeComponents(event.target.value)
  }

  changeBpcCost(event) {
    this.props.changeBpcCost(event.target.value)
  }

  changeRun(event) {
    this.props.changeRun(event.target.value)
  }

  changeMe(event) {
    this.props.changeMe(event.target.value)
  }

  changeTe(event) {
    this.props.changeTe(event.target.value)
  }

  render() {
    let calculator = (
      <div className='row'>
        <div className='col-md-12'>
          <table className='inside'>
            <thead>
            <tr>
              <th colSpan="2">Calculator</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td colSpan='2' className='inside-table'>

                <div className='row'>
                  <div className='col-md-6'>Orders for output item(s)</div>
                  <div className='col-md-6'>
                    <select value={this.props.type_p_item} onChange={this.changePriceTypeItem.bind(this)}>
                      {['sell', 'buy'].map(val => {
                        return <option key={val} value={val}>{val} orders</option>
                      })}
                    </select>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-md-6'>Orders for components</div>
                  <div className='col-md-6'>
                    <select value={this.props.type_p_components} onChange={this.changePriceTypeComponents.bind(this)}>
                      {['sell', 'buy'].map(val => {
                        return <option key={val} value={val}>{val} orders</option>
                      })}
                    </select>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-md-6'>Factory</div>
                  <div className='col-md-6'>
                    <select className='w100'>
                      <option value='12'>Status</option>
                    </select>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-md-6'>ME / TE</div>
                  <div className='col-md-6'>
                    <select value={this.props.me} onChange={this.changeMe.bind(this)}>
                      {[10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0].map((val) => {
                        return <option key={val} value={val}>ME {val}</option>
                      })}
                    </select>
                    <select value={this.props.te} onChange={this.changeTe.bind(this)}>
                      {[10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0].map((val) => {
                        return <option key={val} value={val}>TE {val}</option>
                      })}
                    </select>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-md-6'>Run / Output items</div>
                  <div className='col-md-6'>
                    <input onChange={this.changeRun.bind(this)}
                           value={this.props.run}/> x {this.props.output}
                  </div>
                </div>
                <div className='row'>
                  <div className='col-md-6'>Cost components, isk</div>
                  <div className='col-md-6'>{Helper.price(this.props.components_amount)}</div>
                </div>
                <div className='row'>
                  <div className='col-md-6'>Cost output item, isk</div>
                  <div className='col-md-6'>{Helper.price(this.props.item_amount)}</div>
                </div>
                <div className='row'>
                  <div className='col-md-6'>BPC cost</div>
                  <div className='col-md-6'>
                    <input
                      onChange={this.changeBpcCost.bind(this)}
                      value={this.props.bpc_cost}/></div>
                </div>
                {/*<div className='row'>*/}
                  {/*<div className='col-md-6'>System manufacture</div>*/}
                  {/*<div className='col-md-6'>465</div>*/}
                {/*</div>*/}
                <div className='row'>
                  <div className='col-md-6'>Total, isk</div>
                  <div className='col-md-6'>{Helper.price(this.props.total)}</div>
                </div>
                <div className='row'>
                  <div className='col-md-6'>Profit, isk</div>
                  <div className='col-md-6'>
                    <span
                      className={this.props.profit >= 0 ? 'txt-yellow' : 'profit-minus'}>{Helper.price(this.props.profit)}</span>
                  </div>
                </div>

              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    )

    return this.props.bpc_title ? calculator : null
  }
}

function mapStateToProps(state) {
  return state.manufactureReducers
}
export default connect(mapStateToProps, {
  changeMe,
  changeRun,
  changeTe,
  recalculateManufacture,
  changeBpcCost,
  changePriceTypeItem,
  changePriceTypeComponents
})(Calculator)
