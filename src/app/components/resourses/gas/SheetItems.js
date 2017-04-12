import React from "react";
import { connect } from "react-redux";
import { map, each, sortBy } from "lodash";
// components
import ShortList from "./ShortList";

const ventureCargo = 5000;

const getProfit = (item, props) => {
  let { prices, price_type } = props;
  if (props.list_type === "venture") {
    return Math.floor(ventureCargo / item.volume) * prices[price_type][item.item_id];
  } else {
    return prices[price_type][item.item_id] / item.volume;
  }
};

class SheetItems extends React.Component {
  // Sort schemes
  sortGases(gas_list) {
    each(gas_list, v => {
      v.profit = getProfit(v, this.props);
    });
    return sortBy(gas_list, "profit").reverse();
  }

  getGasesList(gas_list) {
    if (gas_list.length === 0) {
      return null;
    }
    const { filter, prices, price_type, list_type } = this.props;
    let resultList = map(gas_list, v => {
      if (v.item_name.toLowerCase().indexOf(String(filter).toLowerCase()) === -1) {
        return null;
      }
      let slist = (
        <ShortList item={v} list_type={list_type} ventureCargo={ventureCargo} prices={prices} price_type={price_type} />
      );
      return <div key={v.item_id}>{slist}</div>;
    });
    return (
      <div className="row">
        <div className="col-md-12 col-sm-12 col-lg-12 col-xs-12">
          <table className="inside">
            <thead>
              <tr>
                <th colSpan="2">
                  <div className="flex-between">
                    <div>Gases</div>
                    <div>{list_type === 'venture' ? 'Venture Cargo ('+ventureCargo+' m3)' : ''}</div>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="2" className="inside-table">
                  {resultList}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  render() {
    let { gas_list } = this.props;
    let sortedGases = this.sortGases(gas_list);
    return this.getGasesList(sortedGases);
  }
}

export default connect(state => state.gasReducer, {})(SheetItems);
