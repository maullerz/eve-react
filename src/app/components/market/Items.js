import React, {Component} from 'react'
import {connect} from 'react-redux'
import {setQty} from "../../controllers/actions/marketActions"
import Helper from "../../helpers"

class Items extends Component {

  changeQty(item_id, event) {
    this.props.setQty(item_id, event.target.value)
  }

  render() {

    this.similar = this.props.items.map(val => {
      return <li key={val.item_id}>
        <div className="m-b-1">
          <img
            className="img24"
            alt={val.item_id}
            src={'https://image.eveonline.com/Type/' + val.item_id + '_64.png'}/>
          {val.item_name} <input className="w130px"
                                 onChange={this.changeQty.bind(this, val.item_id)} type="text"
                                 value={val.qty}/> x 15.000 = {Helper.price(val.qty * 63)}
        </div>
      </li>
    })

    let similarItems = <div className="row">
      <div className="col-md-12">
        <table>
          <thead>
          <tr>
            <th>List market</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>
              <ul className="list">{this.similar}</ul>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    return this.props.items.length ? similarItems : null
  }
}

function mapStateToProps(state) {
  return state.marketReducer
}
export default connect(mapStateToProps, {setQty})(Items);
