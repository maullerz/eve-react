import React from 'react'
import {connect} from 'react-redux'
import Helper from './../../../helpers'
import {changePriceTypeOutput, changePriceTypeInput, changeCycle} from '../../../actions/planetActions'
// components
import SystemOutput from './../planet/SystemOutput'
import SystemInput from './../planet/SystemInput'

class Calculator extends React.Component {

  changePriceTypeInput(type) {
    this.props.changePriceTypeInput(type)
  }

  changePriceTypeOutput(type) {
    this.props.changePriceTypeOutput(type)
  }

  changeCycle(event) {
    this.props.changeCycle(event.target.value)
  }

  render() {
    let col = {
      left: 'col-md-4',
      right: 'col-md-8'
    }

    let panel = (
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
                  <div className={col.left}>Cost input materials, isk</div>
                  <div className={col.right}>
                    <SystemInput />
                    <div className='btn-group'>
                      <button onClick={this.changePriceTypeInput.bind(this, 'sell')}
                              className={this.props.type_price_input === 'sell' ? 'active' : ''}>sell
                      </button>
                      <button onClick={this.changePriceTypeInput.bind(this, 'buy')}
                              className={this.props.type_price_input === 'buy' ? 'active' : ''}>buy
                      </button>
                    </div>
                    <span className='padd-left-3 txt-yellow'>{Helper.price(this.props.input_amount)}</span>
                  </div>
                </div>
                <div className='row'>
                  <div className={col.left}>Cost output material, isk</div>
                  <div className={col.right}>
                    <SystemOutput />
                    <div className='btn-group'>
                      <button onClick={this.changePriceTypeOutput.bind(this, 'sell')}
                              className={this.props.type_price_output === 'sell' ? 'active' : ''}>sell
                      </button>
                      <button onClick={this.changePriceTypeOutput.bind(this, 'buy')}
                              className={this.props.type_price_output === 'buy' ? 'active' : ''}>buy
                      </button>
                    </div>
                    <span className='padd-left-3 txt-yellow'>{Helper.price(this.props.output_amount)}</span>
                  </div>
                </div>
                <div className='row'>
                  <div className={col.left}>Cycle</div>
                  <div className={col.right}>
                    <div className='btn-group'>
                      <select value={this.props.cycle} onChange={this.changeCycle.bind(this)}>
                        {Helper.const.cycles.map((val, i) => {
                          return <option key={i} value={val.val}>{val.name}</option>
                        })}
                      </select>
                    </div>
                  </div>
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

    return this.props.materials.length ? panel : null
  }
}

export default connect(state => state.planetReducer, {
  changePriceTypeOutput,
  changePriceTypeInput,
  changeCycle
})(Calculator)