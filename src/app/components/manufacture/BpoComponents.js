import React, {Component} from 'react'
import {connect} from 'react-redux'
import Helper from '../../helpers'
import { ItemView } from '../item'


class BpoComponents extends Component {

  render () {
    this._components = this.props.bpc_components.map((val) => {
      let itemId = val.item_id
      let price = this.props.prices[this.props.type_p_components][itemId]
      return (
        <ItemView
          key={val.item_id}
          typeID={val.item_id}
          name={val.item_name}
          price={price}
          quantity={val.orig_qty}
        />
      )
    })
    let components = (
      <div className='row'>
        <div className='col-md-12'>
          <table>
            <thead>
              <tr>
                <th>Components ({Helper.shortNum(this.props.components_amount)} isk)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <ul className='components list'>
                    {this._components}
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
    return this._components.length ? components : null
  }
}

function mapStateToProps (state) {
  return state.manufactureReducer
}
export default connect(mapStateToProps, {})(BpoComponents)
