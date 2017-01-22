import React, { Component } from 'react'
import Helper from '../../helpers'
import ReactTooltip from 'react-tooltip'


const ItemsList = ({item}) => {
  console.log(item)
  return (
    <div className='inline user_img' data-tip data-for={randId}>
      <img alt={item.item_name}
        src={'https://image.eveonline.com/Type/' + item.item_id + '_64.png'} />
      <ReactTooltip class='reactToolTip' delayHide={0} id={randId} type='dark' effect='solid'>
        <div className='b'>{item.item_name}</div>
      </ReactTooltip>
    </div>
  )
}
export default ItemsList