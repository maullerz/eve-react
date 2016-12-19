import React, {Component} from 'react'
import {connect} from 'react-redux'
import Helper from '../../helpers'
import SystemManufacture from '../manufacture/SystemManufacture'
import SystemComponents from '../manufacture/SystemComponents'
import SystemItem from '../manufacture/SystemItem'
import {
  changeMe,
  changeRun,
  changeTe,
  changeBpcCost,
  recalculateManufacture,
  changePriceTypeItem,
  changePriceTypeComponents,
  setComponentsSystem,
  setItemSystem
} from '../../controllers/actions/manufactureActions'

class Calculator extends Component {

  componentWillReceiveProps(np) {

    if (np._need_update_prices_items) {
      this.props.setItemSystem(this.props.pisystem_id, np)
    }
    if (np._need_update_prices_componets) {
      this.props.setComponentsSystem(this.props.pcsystem_id, np)
    }
    if (np._need_recalculate) {
      this.props.recalculateManufacture(np)
    }
  }

  changePriceTypeItem(type) {
    this.props.changePriceTypeItem(type)
  }

  changePriceTypeComponents(type) {
    this.props.changePriceTypeComponents(type)
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
    let col = {
      left: 'col-md-4',
      right: 'col-md-8'
    }

    let calculator = (
      <div className='row'>
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
                  <div className={col.left}>Factory</div>
                  <div className={col.right}>
                    <select className='w100'>
                      <option value='12'>Status</option>
                    </select>
                  </div>
                </div>
                <div className='row'>
                  <div className={col.left}>ME / TE</div>
                  <div className={col.right}>
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
                  <div className={col.left}>Run / Output items</div>
                  <div className={col.right}>
                    <input
                      onChange={this.changeRun.bind(this)}
                      value={this.props.run}/> x {this.props.output}
                  </div>
                </div>
                <div className='row'>
                  <div className={col.left}>Cost components, isk</div>
                  <div className={col.right}>
                    <SystemComponents />
                    <div className='btn-group'>
                      <button onClick={this.changePriceTypeComponents.bind(this, 'sell')}
                              className={this.props.type_p_components === 'sell' ? 'active' : ''}>sell
                      </button>
                      <button onClick={this.changePriceTypeComponents.bind(this, 'buy')}
                              className={this.props.type_p_components === 'buy' ? 'active' : ''}>buy
                      </button>
                    </div>
                    <span className="padd-left-3">{Helper.price(this.props.components_amount)}</span>
                  </div>
                </div>
                <div className='row'>
                  <div className={col.left}>Cost output item, isk</div>
                  <div className={col.right}>
                    <SystemItem />
                    <div className='btn-group'>
                      <button onClick={this.changePriceTypeItem.bind(this, 'sell')}
                              className={this.props.type_p_item === 'sell' ? 'active' : ''}>sell
                      </button>
                      <button onClick={this.changePriceTypeItem.bind(this, 'buy')}
                              className={this.props.type_p_item === 'buy' ? 'active' : ''}>buy
                      </button>
                    </div>
                    <span className="padd-left-3">{Helper.price(this.props.item_amount)}</span>
                  </div>
                </div>
                <div className='row'>
                  <div className={col.left}>BPC cost</div>
                  <div className={col.right}>
                    <input
                      onChange={this.changeBpcCost.bind(this)}
                      value={this.props.bpc_cost}/>
                  </div>
                </div>
                <div className='row'>
                  <div className={col.left}>System manufacture</div>
                  <div className={col.right}>
                    <div className='inline-block-search'>
                      <SystemManufacture />
                    </div>
                    <span>&nbsp;{Helper.price(this.props.adjustCost)}
                      ({Helper.price(+this.props.costIndex * 100)}%)</span>
                  </div>
                </div>
                <div className='row'>
                  <div className={col.left}>Total, isk</div>
                  <div className={col.right}>{Helper.price(this.props.total)}</div>
                </div>
                <div className='row'>
                  <div className={col.left}>Profit, isk</div>
                  <div className={col.right}>
                      <span className={this.props.profit >= 0 ? 'txt-yellow' : 'profit-minus'}>
                        {Helper.price(this.props.profit)}
                      </span>
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
  changePriceTypeComponents,
  setComponentsSystem,
  setItemSystem
})(Calculator)
