import React, {Component} from 'react'
import {connect} from 'react-redux'
import Helper from '../../helpers'

class BpoComponents extends Component {

  render () {
    this._components = this.props.bpc_components.map((val) => {
      let itemId = val.item_id
      let price = this.props.prices[this.props.type_p_components][itemId]
      return (<li key={val.item_id}>
        <div className='containter'>
          <div className='img-box'>
            <img
              alt={val.item_name}
              src={'https://image.eveonline.com/Type/' + val.item_id + '_32.png'} />
          </div>
          <div className='text-holder'>
            {val.item_name} x {Helper.qty(val.orig_qty)} (<span className='txt-lime'>{Helper.price(price)}</span>)
            <div>
              <span className='txt-yellow b'>{Helper.price(price * val.orig_qty)} ISK</span>
            </div>
          </div>
        </div>
      </li>)
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
                  <ul className='components'>
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
  return state.manufactureReducers
}
export default connect(mapStateToProps, {})(BpoComponents)
