import React, {Component} from 'react'
import {connect} from 'react-redux'
import { ItemView } from '../item'
import {changeBuildComponents} from '../../actions/manufactureActions'


class BuildOwnComponents extends Component {

  showCopyPasteZone() {
    let status = !this.props.is_build_own
    this.props.changeBuildComponents(status)
  }

  render () {
    this._components = this.props.build_components.map(val => {
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
                <th style={{userSelect: 'none'}} onClick={this.showCopyPasteZone.bind(this)} className='pointer'>[{this.props.is_build_own ? '-' : '+'}] Build Own Components</th>
              </tr>
            </thead>
            <tbody className={this.props.is_build_own ? '' : 'hide'}>
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
export default connect(state => state.manufactureReducer, {changeBuildComponents})(BuildOwnComponents)
