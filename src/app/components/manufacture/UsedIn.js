import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getBpc} from './../../controllers/actions/manufactureActions'
import {browserHistory} from "react-router"

class UsedIn extends Component {

  openBpc = (url) => {
    browserHistory.push("/manufacture/" + url);
    this.props.getBpc(url);
  }

  render() {

    this.used_in = this.props.used_in.map((val, index) => {
      return <li key={index} onClick={this.openBpc.bind(this, val.url)}>
        <div className="m-b-1">
          <img
            className="img24"
            alt={val.blueprint_id}
            src={'https://image.eveonline.com/Type/' + val.blueprint_id + '_64.png'}/>
          {val.blueprint_name} ({val.component_value})
        </div>
      </li>
    })

    if (this.used_in.length) {
      return (
        <div className="row">
          <div className="col-md-12">
            <table>
              <thead>
              <tr>
                <th>Used In</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>
                  <ul>{this.used_in}</ul>
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
  return {
    bpc: state.manufactureReducers.bpc,
    used_in: state.manufactureReducers.used_in,
    bpc_components: state.manufactureReducers.bpc_components,
    decryptors: state.manufactureReducers.decryptors,
    item: state.manufactureReducers.item,
    price_items: state.manufactureReducers.price_items
  }
}
export default connect(mapStateToProps, {getBpc})(UsedIn)
