import React from 'react';
import Helper from './../../../../app/helpers';
import { map } from 'lodash';

const OneItem = props => {
  const { item, price_type, prices, ventureCargo } = props;

  const outputValue = Helper.price(item.profit);
  const percColor = item.profit >= 0 ? 'txt-yellow' : 'profit-minus';
  let outputCost = 0;

  //let inputItems = map(item.input, (v, i) => {
  //  let amount = input_prices[price_input_type][v.item_id] * v.quantity;
  //  outputCost += amount;
  //
  //  return (
  //    <div key={i} className="row">
  //      <div className="col-md-12 col-sm-12 col-xs-12 flex-between">
  //        <span>
  //          <img className="img16 pen" alt={v.item_name} src={`https://image.eveonline.com/Type/${v.item_id}_32.png`} />
  //          {v.item_name} {v.quantity} x {Helper.price(input_prices[price_input_type][v.item_id])} isk
  //        </span>
  //        <span>{Helper.price(amount)}</span>
  //      </div>
  //    </div>
  //  );
  //});

  return (
    <div className="row">
      <div className="col-md-12">
        <table className="inside">
          <thead>
            <tr>
              <th colSpan="2">
                <div className="flex-between">
                  <div>{item.item_name}</div>
                  <div className={percColor}>{outputValue}</div>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="2" className="inside-table">
                123
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OneItem;
