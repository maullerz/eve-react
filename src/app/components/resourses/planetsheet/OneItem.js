import React from 'react';
import Helper from './../../../../app/helpers';
import { map } from 'lodash';

const OneItem = props => {
  const { item, price_input_type, input_prices } = props;

  const outputValue = Helper.price(item.profit);
  const percColor = item.profit >= 0 ? 'txt-yellow' : 'profit-minus';
  let outputCost = 0;

  let inputItems = map(item.input, (v, i) => {
    let amount = input_prices[price_input_type][v.item_id] * v.quantity;
    outputCost += amount;

    return (
      <div key={i} className="row">
        <div className="col-md-12 col-sm-12 col-xs-12 flex-between">
          <span>{v.item_name}</span>
          <span>{Helper.price(amount)}</span>
        </div>
      </div>
    );
  });

  return (
    <div className="row">
      <div className="col-md-12">
        <table className="inside">
          <thead>
            <tr>
              <th colSpan="2">
                <div className="flex-between">
                  <div className="item-output">
                    <div>{item.schema_name}</div>
                    <div className={percColor}>{outputValue}</div>
                  </div>
                  <span className="txt-normal">{Helper.price(outputCost)}</span>
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
    </div>
  );
};

export default OneItem;
