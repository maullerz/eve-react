import React from 'react'
import ReactTooltip from 'react-tooltip'

const ItemsList = ({item, clickItem}) => {
  let randId = 'id-' + Math.ceil(Math.random() * 1000000000)
  return (
    <div onClick={() => clickItem(item)} className='inline user_img' data-tip data-for={randId}>
      <img alt={item.item_name}
        src={'https://image.eveonline.com/Type/' + item.item_id + '_64.png'} />
      <ReactTooltip class='reactToolTip' delayHide={0} id={randId} type='dark' effect='solid'>
        <div className='b'>
          <div>{item.item_name}</div>
          <div><small>{item.count}</small> items</div>
        </div>
      </ReactTooltip>
    </div>
  )
}
export default ItemsList