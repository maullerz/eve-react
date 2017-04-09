import React from "react";
import { connect } from "react-redux";
import { map, sum, each, sortBy } from "lodash";

// components
import ShortList from "./ShortList";

const getProfit = (item, props) => {
  let { typeID, quantity, input } = item;
  let { input_prices: ip, output_prices: op, price_input_type: pit, price_output_type: pot } = props;
  let costOutput = quantity * op[pot][typeID];
  let inputItems = map(input, v => {
    return v.quantity * ip[pit][v.item_id];
  });
  return costOutput - sum(inputItems);
};

class SheetItems extends React.Component {
  // Sort schemes
  sortReactions(schemes) {
    each(schemes, v => {
      v.profit = getProfit(v, this.props);
    });
    return sortBy(schemes, "profit").reverse();
  }

  getMaterialList(schemes) {
    const { filter, list_type } = this.props;
    if (schemes.length === 0) {
      return null;
    }
    let resultList = map(schemes, (v, i) => {
      let inputItems = map(v.input, "item_name");
      inputItems.push(v.schema_name);
      let ftd = map(inputItems, v => v.toLowerCase());
      ftd = ftd.join(",");

      if (ftd.indexOf(String(filter).toLowerCase()) === -1) {
        return null;
      }
      const shortList = <ShortList item={v} />;

      return list_type === "full" ? null : shortList;
    });
    return list_type === "full"
      ? <div>{resultList}</div>
      : <div className="row">
          <div className="col-md-12">
            <table className="inside">
              <thead>
                <tr>
                  <th colSpan="2">
                    <div className="flex-between">
                      <div>Planet materials</div>
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
        </div>;
  }

  render() {
    const { schemes } = this.props;
    const sortedMaterials = this.sortReactions(schemes);
    return this.getMaterialList(sortedMaterials);
  }
}

export default connect(state => state.planetSheetReducer, {})(SheetItems);
