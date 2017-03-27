import React from "react";
import Helper from "./../../../../app/helpers";
import {map} from "lodash";

import refinedOutputs from './refinedOutputs.json'
import './OneItem.css'

const ReprocessRatio = 0.52
const ScrapmetalSkill = 1.1

const ShortList = (props) => {
  const {
    item,
    prices,
    price_input_type,
    price_output_type,
    getProfit,
    unrefined
  } = props
  const price_output = prices[price_output_type]

  let outputCost = 0
  if (unrefined) {
    const outputs = refinedOutputs[item.item_id]
    outputs.forEach(item => {
      const outputAmount = Math.trunc(item.quantity * ReprocessRatio * ScrapmetalSkill)
      outputCost += (prices[price_output_type][item.typeId] * outputAmount)
    })
  } else {
    outputCost = price_output[item.item_id] * item.quantity;
  }

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
