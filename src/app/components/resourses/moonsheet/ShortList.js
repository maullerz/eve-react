import React from "react";
import Helper from "./../../../../app/helpers";

import './OneItem.css'

const ShortList = (props) => {
  const {
    item,
    getProfit,
  } = props
  const profit = getProfit(item, props)
  const outputValue = Helper.price(profit)
  const percColor = profit >= 0 ? "txt-yellow" : "profit-minus"

  return (<div key={item.item_id} className="row">
    <div className="col-md-12 col-sm-12 col-xs-12 flex-between">
      <span>{item.item_name}</span>
      <span><div className={percColor}>{Helper.price(outputValue)}</div></span>
    </div>
  </div>)
};

export default ShortList