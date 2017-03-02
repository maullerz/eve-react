import React from 'react'
import Helper from '../../helpers'
import SingleComponentItemView from './SingleComponentItemView'

import './ItemView.css'

const ItemView = props => {
  const {typeID, name, quantity, components, component_me, facility_me, prices} = props
  const sum = Helper.price(props.price * quantity)
  const price = Helper.price(props.price)

  let cmps = Helper.manufactureQty(components, component_me, facility_me, quantity)
  let _components = cmps.map(val => {
    return <SingleComponentItemView
      key={val.item_id}
      typeID={val.item_id}
      name={val.item_name}
      quantity={val.qty}
      prices={prices}
    />
  })

  return (
    <li>
      <div className='item-view-cont'>
        <div className='img-box'>
          <img alt={name} src={`https://image.eveonline.com/Type/${typeID}_32.png`}/>
        </div>
        <div className='item-descr'>
          <div className='item-row-first'>
            <div className='item-name'>
              {name}
            </div>
            <div className='item-amount'>
              {'x'}&nbsp;{Helper.qty(quantity)}
            </div>
            <div className='item-price txt-lime'>
              {price}
            </div>
          </div>
        </div>
      </div>
      <ul className="ulOwnComponents">{_components}</ul>
    </li>
  )
}

export default ItemView
