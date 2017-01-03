import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addItem} from '../../controllers/actions/marketActions'

class SimilarItems extends Component {

  addItem (item) {
    this.props.addItem(item)
  }
  render () {
    this.similar = this.props.similarItems.map(val => {
      return <li key={val.item_id} onClick={this.addItem.bind(this, val)}>
        <div className='m-b-1'>
          <img
            className='img24'
            alt={val.item_id}
            src={'https://image.eveonline.com/Type/' + val.item_id + '_64.png'} />
          {val.item_name}
        </div>
      </li>
    })

    let similarItems = <div className='row'>
      <div className='col-md-12'>
        <table>
          <thead>
            <tr>
              <th>Similar Items</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <ul className='list'>{this.similar}</ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    return this.props.similarItems.length ? similarItems : null
  }
}

function mapStateToProps (state) {
  return state.marketReducer
}
export default connect(mapStateToProps, {addItem})(SimilarItems)
