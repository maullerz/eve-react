import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getBpc} from './actions/manufactureActions'
// components
import SearchBpoPanel from './../components/manufacture/SearchBpoPanel'
import UsedIn from './../components/manufacture/UsedIn'
import BpoComponents from './../components/manufacture/BpoComponents'
import Calculator from './../components/manufacture/Calculator'

class Manufacture extends Component {

  componentWillMount() {
    // Initial bpc when load Url
    if (this.props.params.url && !this.props.bpc_title) {
      this.props.getBpc(this.props.params.url)
    }
  }

  render() {
    return (
      <div>
        <SearchBpoPanel />
        <div className='row'>
          <div className='col-md-6 t-a_l col-first'>
            <Calculator />
            <UsedIn />
          </div>
          <div className='col-md-6 t-a_l col-last'>
            <BpoComponents />
          </div>
        </div>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return state.manufactureReducers
}
export default connect(mapStateToProps, {getBpc})(Manufacture)
