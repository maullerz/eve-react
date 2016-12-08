import React, {Component} from 'react'
import SearchBpoPanel from './../components/manufacture/SearchBpoPanel'
import UsedIn from './../components/manufacture/UsedIn'
import {connect} from 'react-redux'

class Manufacture extends Component {

  render() {

    return (
      <div>
        <SearchBpoPanel />
        <div className='row'>
          <div className='col-md-3 t-a_l'>


            <UsedIn />

          </div>
          <div className='col-md-9 t-a_l'>{this.props.bpc.bpc ? this.props.bpc.bpc.blueprint_name : "null"}</div>
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
export default connect(mapStateToProps, {})(Manufacture);
