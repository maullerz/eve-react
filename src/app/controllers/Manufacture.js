import React, {Component} from "react"
import SearchBpoPanel from "./../components/manufacture/SearchBpoPanel"

class Manufacture extends Component {

  render() {


    
    return (
      <div>
        <SearchBpoPanel />
        <div className='row'>
          <div className='col-md-3 t-a_l'/>
          <div className='col-md-9 t-a_l'>{}</div>
        </div>
      </div>
    )
  }
}

export default Manufacture
