import React, {Component} from 'react'
import {connect} from 'react-redux'
// import {addItem} from '../../controllers/actions/marketActions'

class Settings extends Component {

  render() {

  let settings = <div className="row">
      <div className="col-md-12">
        <table>
          <thead>
          <tr>
            <th>Settings</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>
              <ul className="list">ds</ul>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    return this.props.items.length ? settings : null
  }
}

function mapStateToProps(state) {
  return state.marketReducer
}
export default connect(mapStateToProps, {})(Settings);
