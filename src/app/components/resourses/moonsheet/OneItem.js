import React from "react";
import Helper from "./../../../../app/helpers";
import { map } from "lodash";

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
    expanded,
    getProfit,
    unrefined,
  } = props
  const price_input = prices[price_input_type]
  const price_output = prices[price_output_type]

  let inputAmount = 0;
  let inputItems = map(item["input"], (v, i) => {
    let amount = v.quantity * price_input[v.item_id];
    inputAmount += amount;
    return (
      <div key={i} className="row">
        <div className="col-md-12 col-sm-12 col-xs-12 flex-between">
          <span>{v.item_name}</span>
          <span>{Helper.price(amount)}</span>
        </div>
      </div>
    );
  });

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
  const outputValue = `${Helper.price(profit)}`
  const percColor = profit >= 0 ? "txt-yellow" : "profit-minus"

  return (
    <div className="row">
      <div className="col-md-12">
        <table className="inside">
          <thead>
            <tr>
              <th colSpan="2">
                <div className="flex-between">
                  <div className="item-output">
                    <div>{item.item_name}</div>
                    <div className={percColor}>
                      {outputValue}
                    </div>
                  </div>
                  <span className="txt-normal">
                    {Helper.price(outputCost)}
                  </span>
                </div>

              </th>
            </tr>
          </thead>
          <tbody style={{ display: expanded ? 'table-row-group' : 'none' }}>
            <tr>
              <td colSpan="2" className="inside-table">
                {inputItems}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OneItem
