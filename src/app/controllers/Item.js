import React, {Component} from 'react'
import PanelContent from './../components/blocks/_panel_content'
import SimilarItems from './../components/item/SimilarItems'
// axios

export default class Item extends Component {

  render () {
    let llllisssst = [0, 2, 6, 5]
    return (
      <div>
        <PanelContent title='Where components used?' />
        <div className='row'>
          <div className='col-md-3 t-a_l'>
            <SimilarItems list={llllisssst} />
          </div>
          <div className='col-md-9 t-a_l'>
            List
          </div>
        </div>
      </div>
    )
  }
}
