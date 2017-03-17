import React from 'react'
import {connect} from 'react-redux'
import Helper from './../../../../app/helpers'

class OneItem extends React.Component {

  render() {

    let {item} = this.props
    
    return (
      <div className='row'>
        <div className='col-md-12'>
          <table className='inside'>
            <thead>
            <tr>
              <th colSpan='2'>
                <div style={{display: 'flex',justifyContent: 'space-between', alignItems: 'center'}}>
                  <span>{item.item_name}</span>
                  <span className="txt-normal">{Helper.qty(item.quantity)} m3</span>
                </div>

              </th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td colSpan='2' className='inside-table'>
                <div className='row'>
                  <div className="col-md-6">Filter</div>
                  <div className="col-md-6">dsd</div>
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

export default connect(state => state.moonSheetReducer, {})(OneItem)