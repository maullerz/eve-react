import React, {Component} from 'react'
import {connect} from 'react-redux'

class UsedIn extends Component {

  constructor(props) {
    super(props)
    this.used_in = this.props.used_in
  }

  render() {

    this.used_in = this.props.used_in.map((val, index) => {
      return <li key={index}>
        <div className="padd-b-3">
          <div className="used_in bpc">
            <img
              className="img32 used_in info"
              alt={val.blueprint_id}
              src={'https://image.eveonline.com/Type/' + val.blueprint_id + '_64.png'}/>
          </div>
          <div className="used_in_info">
            {val.blueprint_name}
          </div>
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
      return <div></div>
    }
  }
}

function mapStateToProps(state) {
  return {
    manufacture: state.manufactureReducers.manufacture,
    used_in: state.manufactureReducers.used_in
  }
}
export default connect(mapStateToProps, {})(UsedIn)
