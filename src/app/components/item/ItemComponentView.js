import React from "react";
import Helper from "../../helpers";
import SingleComponentItemView from "./SingleComponentItemView";

import "./ItemView.css";

const ItemView = props => {
  const {
    typeID,
    output,
    name,
    quantity,
    components,
    component_me,
    facility_me,
    prices
  } = props;
  let price = 0;
  let cmps = Helper.manufactureQty(
    components,
    component_me,
    facility_me,
    quantity
  );
  let _components = cmps.map(val => {
    let qty = Math.ceil(val.qty / output);
    price += qty * prices[val.item_id];
    return (
      <SingleComponentItemView
        key={val.item_id}
        typeID={val.item_id}
        name={val.item_name}
        quantity={qty}
        prices={prices}
      />
    );
  });

  return (
    <li>
      <div className="item-view-cont">
        <div className="img-box">
          <img
            alt={name}
            src={`https://image.eveonline.com/Type/${typeID}_32.png`}
          />
        </div>
        <div className="item-descr">
          <div className="item-row-first">
            <div className="item-name">
              {name}
            </div>
            <div className="item-amount">
              {"x"}&nbsp;{Helper.qty(quantity)}
            </div>
            <div className="item-price txt-lime">
              {Helper.price(price)}
            </div>
          </div>
        </div>
      </div>
      <ul className="ulOwnComponents">{_components}</ul>
    </li>
  );
};

export default ItemView;
