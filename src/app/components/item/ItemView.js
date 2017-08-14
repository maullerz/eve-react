import React from 'react';
import Helper from '../../helpers';

import './ItemView.css';

const ItemView = props => {
  const { typeID, name, quantity, price } = props;
  const sum = Helper.price(price * quantity);

  return (
    <li>
      <div className="item-view-cont">
        <div className="img-box">
          <img alt={name} src={`https://image.eveonline.com/Type/${typeID}_32.png`} />
        </div>
        <div className="item-descr">
          <div className="item-row-first">
            <div className="item-name">
              {name}
            </div>
            <div className="item-amount">
              {'x'}&nbsp;{Helper.qty(quantity)}
            </div>
            <div className="item-price txt-lime">
              {Helper.price(price)}
            </div>
          </div>
          <span className="txt-yellow b">{sum} ISK</span>
        </div>
      </div>
    </li>
  );
};

export default ItemView;
