import React, {Component} from 'react'
import {connect} from 'react-redux'

let used_in = [];

class UsedIn extends Component {

  constructor(){
    super()
    this.state = {
      used_in: []
    }
  }
  componentDidUpdate() {

    if (this.props.bpc.used_in) {

      let used_in = this.props.bpc.used_in.map((val) => {
        return <li>{val.blueprint_name}</li>
      });
      this.setState({
        used_in: used_in
      })
    }
    console.log(this.state);
  }

  render() {



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
                <ul></ul>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    bpc: state.manufactureReducers.bpc
  }
}
export default connect(mapStateToProps, {})(UsedIn)
