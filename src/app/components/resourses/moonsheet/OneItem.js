import React from "react";
import Helper from "./../../../../app/helpers";
import {map} from "lodash";

import refinedOutputs from './refinedOutputs.json'
import './OneItem.css'

const ReprocessRatio = 0.52
const ScrapmetalSkill = 1.1

const OneItem = (props) => {
  const {
    item,
    prices,
    price_input_type,
    price_output_type,
    getProfit,
    unrefined,
    refinery_type,
  } = props
  const price_input = prices[price_input_type]
  const price_output = prices[price_output_type]

  let inputItems = map(item["input"], (v, i) => {
    let amount = v.quantity * price_input[v.item_id];
    return (
      <div key={i} className="row">
        <div className="col-md-12 col-sm-12 col-xs-12 flex-between">
          <span>
            &nbsp;&nbsp;&nbsp;
            <img className="img16 pen" alt={v.item_name} src={`https://image.eveonline.com/Type/${v.item_id}_32.png`} />
            {v.item_name} {v.quantity} x {Helper.price(price_input[v.item_id])} isk
          </span>
          <span>{Helper.price(amount)}</span>
        </div>
      </div>
    );
  });

  let outputCost = 0
  let outputCostLifeblood = 0
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
  // Lifeblood Athanor
  const reactionProfit = Helper.reactionProfit(profit, unrefined, refinery_type)
  const outputValueLifeblood = Helper.price(reactionProfit)

  return (<div className="row">
    <div className="col-md-12">
      <table className="inside">
        <thead>
        <tr>
          <th>
            <div className="item-output-short">
              <div>
                <img className="img16 pen" alt={item.item_name} src={`https://image.eveonline.com/Type/${item.item_id}_32.png`} />
                <span>{item.item_name} x {item.quantity}</span>
              </div>
              <div className={percColor}>
                {outputValue}
              </div>
              <div className={percColor}>
                {outputValueLifeblood}
              </div>
              <div className="txt-normal">
                {Helper.price(outputCost)}
              </div>
            </div>
          </th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td colSpan="2" className="inside-table">
            {inputItems}
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>)
};

export default OneItem
