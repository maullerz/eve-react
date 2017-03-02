import React, {Component} from 'react'
import {connect} from 'react-redux'
import {ItemComponentView} from '../item'
import {changeBuildComponents, changeMeTeComponents} from '../../actions/manufactureActions'
import Helper from './../../helpers'

class BuildOwnComponents extends Component {

  showCopyPasteZone() {
    let status = !this.props.is_build_own
    this.props.changeBuildComponents(status)
  }
  changeMeTeComponents(mete, event) {
    this.props.changeMeTeComponents('component_' + mete, event.target.value)
  }
  
  render() {

    let cmps = Helper.manufactureQty(this.props.build_components, this.props.me, this.props.facility_val.me, this.props.run)

    this._components = cmps.map(val => {
      let prices = this.props.prices[this.props.type_p_components]
      return (
        <ItemComponentView
          component_me={this.props.component_me}
          facility_me={this.props.facility_val.me}
          components={val.components}
          key={val.item_id}
          typeID={val.item_id}
          name={val.item_name}
          prices={prices}
          quantity={val.qty}
        />
      )
    })


    let components = (
      <div className='row'>
        <div className='col-md-12'>
          <table>
            <thead>
            <tr>
              <th style={{userSelect: 'none', display: 'flex', justifyContent: 'space-between'}} className="pointer">
                <span onClick={this.showCopyPasteZone.bind(this)}>[{this.props.is_build_own ? '-' : '+'}] Build Own Components</span>
                <span className={this.props.is_build_own ? '' : 'hide'}>
                    <select value={this.props.component_te} onChange={this.changeMeTeComponents.bind(this, 'te')}>
                        {[10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0].map((val) => {
                          return <option key={val} value={val}>TE {val}</option>
                        })}
                    </select>
                  <select value={this.props.component_me} onChange={this.changeMeTeComponents.bind(this, 'me')}>
                        {[10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0].map((val) => {
                          return <option key={val} value={val}>ME {val}</option>
                        })}
                    </select>
                  </span>
              </th>
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
export default connect(state => state.manufactureReducer, {
  changeBuildComponents,
  changeMeTeComponents})(BuildOwnComponents)
