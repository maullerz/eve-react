import React, {Component} from 'react'
import {connect} from 'react-redux'
import Helper from "../../helpers"

class BpoComponents extends Component {

  render() {
    this._components = ""
    if (this.props.bpc_components.length > 0) {
      this._components = this.props.bpc_components.map(function (val) {
        return (<li key={val.item_id}>
          <div className="containter">
            <div className="img-box">
              <img
                alt={val.item_name}
                src={'https://image.eveonline.com/Type/' + val.item_id + '_32.png'}/>
            </div>
            <div className="text-holder">
              {val.item_name} x {Helper.qty(val.orig_qty)} (<span className="txt-lime">0.00</span>)
              <div>
                <span className="txt-yellow b">{Helper.price(156554)} ISK</span>
              </div>
            </div>
          </div>
        </li>)
      });
      return (
        <div className="row">
          <div className="col-md-12">
            <table>
              <thead>
              <tr>
                <th>Components</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>
                  <ul className="components">
                    {this._components}
                  </ul>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      )
    } else {
      return null
    }
  }
}

function mapStateToProps(state) {
  return state.manufactureReducers
}
export default connect(mapStateToProps, {})(BpoComponents)
