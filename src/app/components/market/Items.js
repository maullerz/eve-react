import React, { Component } from "react";
import { connect } from "react-redux";
import { setQty, removeItem } from "../../actions/marketActions";
import { ItemView } from "../item";

const SortableButton = props => (
  <div
    className={`sortable-btn ${props.type === props.currSort ? "active" : ""}`}
    onClick={props.onClick.bind(this, props.type)}
  >
    {props.type}
  </div>
);

// TODO: move this to 'components/common/SortableHeader.js'
class SortableHeader extends Component {
  render() {
    const { title, handleSortClick, currSort } = this.props;
    return (
      <th className="sortable-header">
        {false && <span className="header-title">{title}</span>}
        <div className="sortable-columns">
          <SortableButton
            type="name"
            currSort={currSort}
            onClick={handleSortClick}
          />
          <SortableButton
            type="total"
            currSort={currSort}
            onClick={handleSortClick}
          />
          <SortableButton
            type="quantity"
            currSort={currSort}
            onClick={handleSortClick}
          />
          <SortableButton
            type="price"
            currSort={currSort}
            onClick={handleSortClick}
          />
        </div>
      </th>
    );
  }
}

class Items extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortBy: "price",
      order: 1
    };
  }

  handleSortClick = column => {
    let newOrder = 1;
    if (this.state.sortBy === column) newOrder = this.state.order * (-1);
    this.setState({
      sortBy: column,
      order: newOrder
    });
  };

  changeQty(itemId, event) {
    this.props.setQty(itemId, event.target.value);
  }

  removeItem(itemId) {
    this.props.removeItem(itemId);
  }

  getSortableItems() {
    const { items, prices, type_price } = this.props;
    const { sortBy, order } = this.state;
    return items.sort((itemA, itemB) => {
      switch (sortBy) {
        case "name":
          let nameA = itemA.item_name;
          let nameB = itemB.item_name;
          let result = 0;
          if (nameA > nameB) result = 1;
          if (nameA < nameB) result = -1;
          return result * order;
        case "total":
          let totalA = prices[type_price][itemA.item_id] * itemA.qty;
          let totalB = prices[type_price][itemB.item_id] * itemB.qty;
          return (totalB - totalA) * order;
        case "quantity":
          let qtyA = itemA.qty;
          let qtyB = itemB.qty;
          return (qtyB - qtyA) * order;
        case "price":
        default:
          let priceA = prices[type_price][itemA.item_id];
          let priceB = prices[type_price][itemB.item_id];
          return (priceB - priceA) * order;
      }
    });
  }

  renderItems() {
    const sortedItems = this.getSortableItems();
    return sortedItems.map(val => {
      let price = this.props.prices[this.props.type_price][val.item_id];
      // TODO:
      // editable
      // onAmountChange={this.changeQty.bind(this, val.item_id)}
      return (
        <ItemView
          key={val.item_id}
          typeID={val.item_id}
          name={val.item_name}
          price={price}
          quantity={val.qty}
        />
      );
    });
  }

  /**
   * <SortableHeader
   title='List market'
   currSort={this.state.sortBy}
   handleSortClick={this.handleSortClick}
   />
   * @returns {*}
   */

  render() {
    let similarItems = (
      <div className="row">
        <div className="col-md-12">
          <table>
            <thead>
              <tr><th>Types</th></tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <ul className="list">
                    {this.renderItems()}
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
    return this.props.items.length ? similarItems : null;
  }
}

export default connect(state => state.marketReducer, { setQty, removeItem })(
  Items
);
