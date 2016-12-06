import React, {Component} from 'react'
import SearchBpoPanel from './../components/manufacture/SearchBpoPanel'

class Manufacture extends Component {

  render() {

    return (
      <div>
        <SearchBpoPanel />
        {
          [1, 2, 3,].map(function (val) {
            return <b>{val}</b>
          })
        }
        <div className='row'>
          <div className='col-md-3 t-a_l'/>
          <div className='col-md-9 t-a_l'>List</div>
        </div>
      </div>
    )
  }
}

export default Manufacture