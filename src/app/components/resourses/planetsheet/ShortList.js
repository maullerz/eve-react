import React from "react";
import Helper from "./../../../../app/helpers";

const ShortList = props => {
  const { item } = props;

  return (
    <div key={item.item_id} className="row">
      <div className="col-md-12 col-sm-12 col-xs-12 flex-between">
        <span>{item.schema_name}</span>
        <span><div className={item.profit >= 0 ? "txt-yellow" : "profit-minus"}>{Helper.price(item.profit)}</div></span>
      </div>
    </div>
  );
};

export default ShortList;
