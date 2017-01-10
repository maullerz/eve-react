import React from 'react'
import { connect } from 'react-redux'
import { addItem } from '../../actions/itemActions'
import Scrollbars from 'react-custom-scrollbars'
import { browserHistory } from 'react-router'

const SimilarItems = ({item, similar_items, addItem}) => {
  const setNewItem = val => {
    addItem(val)
    browserHistory.push('/item/' + val.url)
  }

  let similar = similar_items.map(val => {
    return <li className={val.item_id === Number(item.item_id) ? 'active' : ''} key={val.item_id} onClick={() => setNewItem(val)}>
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
              <Scrollbars
                autoHeight
                autoHeightMin={0}
                autoHeightMax={300}>
                <ul className='list'>{similar}</ul>
              </Scrollbars>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div >
  return similar_items.length ? similarItems : null
}
export default connect(state => state.itemReducer, { addItem })(SimilarItems)
