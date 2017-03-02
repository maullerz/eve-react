import React from 'react'
import './ItemView.css'
import Helper from './../../helpers'

const SingleComponentItemView = props => {
  const {typeID, quantity, name, prices} = props;
  return <li>
    <div className="opacity05 h-opacity-1"
         style={{userSelect: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
      <div style={{minWidth: '150px'}}>
        <span><img alt={name} src={`https://image.eveonline.com/Type/${typeID}_32.png`}/></span>
        <span>{name} x {Helper.qty(quantity)} (<span className="txt-lime">{Helper.price(prices[typeID])}</span>)</span>
      </div>
      <span>{Helper.price(prices[typeID] * quantity)}</span>
    </div>
  </li>
}

export default SingleComponentItemView
