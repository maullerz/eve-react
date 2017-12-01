import React from "react";
import Helper from "./../../../../app/helpers";

import './ShortList.css'


const ShortList = (props) => {
  const {
    item,
    getProfit,
    unrefined,
    refinery_type,
  } = props
  const profit = getProfit(item, props)
  const outputValue = Helper.price(profit)
  const percColor = profit >= 0 ? "txt-yellow b" : "profit-minus"

  const reactionProfit = Helper.reactionProfit(profit, unrefined, refinery_type)
  const outputValueLifeblood = Helper.price(reactionProfit)

  // const title = `${item.item_id}: ${item.item_name}`
  const title = `${item.item_name}`

  return (
    <div key={item.item_id} className="row">
      <div className="col-md-12 col-sm-12 col-xs-12 flex-between item-output-short">
        <div>{title}</div>
        <div className={percColor}>
          {Helper.price(outputValue)}
        </div>
        <div className={percColor}>
          {outputValueLifeblood}
        </div>
      </div>
    </div>
  )
};

export default ShortList
