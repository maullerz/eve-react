import React, {Component} from 'react'
import {connect} from 'react-redux'
import Helper from '../../helpers'
import {changeMe} from '../../controllers/actions/manufactureActions'

class Calculator extends Component {

  constructor (props) {
    super(props)

    this.state = {
      defaultMe: 10,
      defaultTe: 10,
      run: 1,
      output: 1,
      components_amount: 0
    }
  }

  changeRun (event) {
    this.setState({
      run: event.target.value,
      output: event.target.value * this.props.bpc.output
    })
  }

  changeMe (event) {
    this.setState({defaultMe: event.target.value})
    this.props.changeMe(event.target.value)
  }

  changeTe (event) {
    this.setState({defaultTe: event.target.value})
  }

  render () {
    let calculator = (
      <div className='row'>
        <div className='col-md-12'>
          <table className='inside'>
            <thead>
              <tr>
                <th>Calculator</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan='2' className='inside-table'>
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
                      <select value={this.state.defaultMe} onChange={this.changeMe.bind(this)}>
                        {[10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0].map((val) => {
                          return <option key={val} value={val}>ME {val * 2}</option>
                        })}
                      </select>
                      <select value={this.state.defaultTe} onChange={this.changeTe.bind(this)}>
                        {[10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0].map((val) => {
                          return <option key={val} value={val}>TE {val}</option>
                        })}
                      </select>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-md-6'>Run / Output items</div>
                    <div className='col-md-6'>
                      <input type='text' onChange={this.changeRun.bind(this)}
                        value={this.state.run} /> x {this.state.output}
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-md-6'>Cost components</div>
                    <div className='col-md-6'>{Helper.price(this.props.components_amount)} isk</div>
                  </div>
                  <div className='row'>
                    <div className='col-md-6'>Cost output item</div>
                    <div className='col-md-6'>{Helper.price(560555)} isk</div>
                  </div>
                  <div className='row'>
                    <div className='col-md-6'>BPC cost</div>
                    <div className='col-md-6'><input type='text' value='' /></div>
                  </div>
                  <div className='row'>
                    <div className='col-md-6'>System manufacture</div>
                    <div className='col-md-6'>465</div>
                  </div>
                  <div className='row'>
                    <div className='col-md-6'>Total, ISK</div>
                    <div className='col-md-6'>454345</div>
                  </div>
                  <div className='row'>
                    <div className='col-md-6'>Profit</div>
                    <div className='col-md-6'>13133</div>
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

function mapStateToProps (state) {
  return state.manufactureReducers
}
export default connect(mapStateToProps, {changeMe})(Calculator)
