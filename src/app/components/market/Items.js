import React from 'react';
import { connect } from 'react-redux';
import { setQty, removeItem } from '../../actions/marketActions';
import { ItemView } from '../item';

class Items extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sortBy: 'price',
      order: 1
    };
  }

  render() {
    const items = this.props.items.map(val => {
      let price = this.props.prices[this.props.type_price][val.item_id];
      return <ItemView key={val.item_id} typeID={val.item_id} name={val.item_name} price={price} quantity={val.qty} />;
    });

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
                  <ul className="components list">{items}</ul>
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

export default connect(state => state.marketReducer, { setQty, removeItem })(Items);
