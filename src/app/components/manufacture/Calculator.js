import React, {Component} from 'react'
import {connect} from 'react-redux'

class Calculator extends Component {

  render() {
    let calculator = (
      <div className="row">
        <div className="col-md-12">
          <table>
            <thead>
            <tr>
              <th>Calculator</th>
              <th>Value</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>Components</td>
              <td>15,200,000.00 isk</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    )

    return !!this.props.bpc_title ? calculator : null
  }
}

function mapStateToProps(state) {
  return state.manufactureReducers
}
export default connect(mapStateToProps, {})(Calculator)
