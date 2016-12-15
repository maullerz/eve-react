import React, {Component} from 'react'
import {connect} from 'react-redux'
import Helper from "../../helpers"
import {setComponentsAmount} from "../../controllers/actions/manufactureActions"

class BpoComponents extends Component {

  _components = []

  componentWillReceiveProps(newProps) {
    let amount = 0
    this._components = newProps.bpc_components.map((val) => {

      let item_id = val.item_id
      let price = newProps.prices['sell'][item_id]
      amount += price * val.orig_qty
      return (<li key={val.item_id}>
        <div className="containter">
          <div className="img-box">
            <img
              alt={val.item_name}
              src={'https://image.eveonline.com/Type/' + val.item_id + '_32.png'}/>
          </div>
          <div className="text-holder">
            {val.item_name} x {Helper.qty(val.orig_qty)} (<span className="txt-lime">{Helper.price(price)}</span>)
            <div>
              <span className="txt-yellow b">{Helper.price(price * val.orig_qty)} ISK</span>
            </div>
          </div>
        </div>
      </li>)
    });
    this.props.setComponentsAmount(amount)
  }

  render() {
    let components = (
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
    return this._components.length ? components : null
  }
}

function mapStateToProps(state) {
  return state.manufactureReducers
}
export default connect(mapStateToProps, {setComponentsAmount})(BpoComponents)
