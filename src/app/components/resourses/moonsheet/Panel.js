import React from 'react'
import {connect} from 'react-redux'
import {updateVar} from '../../../actions/moonsheetActions'

// components
import SystemPrice from './SystemPrice'


class Panel extends React.Component {

  changePriceType(v) {
    this.props.updateVar('price_type', v)
  }

  makeFilter(e) {
    this.props.updateVar('filter', e.target.value)
  }

  render() {

    let colLeft = 'col-md-4'
    let colRight = 'col-md-8'
    let {price_type, filter} = this.props

    return (
      <div className='row'>
        <div className='col-md-12'>
          <table className='inside'>
            <thead>
            <tr>
              <th colSpan='2'>Panel</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td colSpan='2' className='inside-table'>
                <div className='row'>
                  <div className={colLeft}>Price System</div>
                  <div className={colRight}>
                    <SystemPrice/>
                    <div className='btn-group'>
                      <button onClick={this.changePriceType.bind(this, 'sell')}
                              className={price_type === 'sell' ? 'active' : ''}>sell
                      </button>
                      <button onClick={this.changePriceType.bind(this, 'buy')}
                              className={price_type === 'buy' ? 'active' : ''}>buy
                      </button>
                    </div>
                  </div>
                </div>
                <div className='row'>
                  <div className={colLeft}>Filter</div>
                  <div className={colRight}>
                    <input className="w130px" onChange={this.makeFilter.bind(this)} value={filter} placeholder="Item name" />
                  </div>
                </div>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default connect(state => state.moonSheetReducer, {updateVar})(Panel)