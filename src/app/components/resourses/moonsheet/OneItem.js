import React from "react";
import Helper from "./../../../../app/helpers";
import { map } from "lodash";

export default ({ item, price_input, price_output }) => {
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

  let amount = price_output[item.item_id] * item.quantity;
  let profit = amount - inputAmount;
  let percentage = amount * 100 / inputAmount - 100;

  return (
    <div className="row">
      <div className="col-md-12">
        <table className="inside">
          <thead>
            <tr>
              <th colSpan="2">
                <div className="flex-between">
                  <span>
                    {item.item_name}
                    {" "}
                    <span
                      className={
                        percentage >= 0 ? "txt-yellow" : "profit-minus"
                      }
                    >
                      {Helper.price(profit)} ({Helper.price(percentage)})
                    </span>
                  </span>
                  <span className="txt-normal">{Helper.price(amount)}</span>
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
