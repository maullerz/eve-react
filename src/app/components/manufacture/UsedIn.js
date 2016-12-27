import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getBpc} from './../../controllers/actions/manufactureActions'

class UsedIn extends Component {

  render() {
    this.used_in = this.props.used_in.map((val, index) => {
      return <li key={index}>
        <div className="m-b-1">
          <img
            className="img24"
            alt={val.blueprint_id}
            src={'https://image.eveonline.com/Type/' + val.blueprint_id + '_64.png'}/>
          {val.blueprint_name} ({val.component_value})
        </div>
      </li>
    })

    let usedIn = <div className="row">
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
              <ul className="list">{this.used_in}</ul>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    return this.used_in.length ? usedIn : null
  }
}

function mapStateToProps(state) {
  return state.manufactureReducer
}
export default connect(mapStateToProps, {getBpc})(UsedIn)
