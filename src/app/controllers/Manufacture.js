import React, {Component} from "react"
import SearchBpoPanel from "./../components/manufacture/SearchBpoPanel"
import {connect} from "react-redux"

class Manufacture extends Component {

  
  
  render() {
    
    console.log(this.props);

    
    return (
      <div>
        <SearchBpoPanel />
        <div className='row'>
          <div className='col-md-3 t-a_l'/>
          <div className='col-md-9 t-a_l'>ds</div>
        </div>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    suggestions: state.manufactureReducers.suggestions || [],
    bpc: state.manufactureReducers.bpc,
    bpc_title: state.manufactureReducers.bpc_title
  }
}
export default connect(mapStateToProps, {})(Manufacture);
