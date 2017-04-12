import React from "react";
import Helper from "./../../../../app/helpers";

const ShortList = props => {
  const { item, ventureCargo, prices, price_type, list_type } = props;
  let detail = list_type === "venture"
    ? Math.floor(ventureCargo / item.volume) + " x " + Helper.price(prices[price_type][item.item_id])
    : "";
  return (
    <div key={item.item_id} className="row">
      <div className="col-md-12 col-sm-12 col-xs-12 flex-between">
        <span>
          <img
            className="img16 pen"
            alt={item.item_name}
            src={`https://image.eveonline.com/Type/${item.item_id}_32.png`}
          />
          {item.item_name} {detail}
        </span>
        <span>
          <div className={item.profit >= 0 ? "txt-yellow b" : "profit-minus"}>{Helper.price(item.profit)}</div>
        </span>
      </div>
    </div>
  );
};

export default ShortList;
