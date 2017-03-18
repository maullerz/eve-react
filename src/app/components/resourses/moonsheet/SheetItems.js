import React from "react";
import { connect } from "react-redux";
import { map } from "lodash";

import OneItem from "./OneItem";

class SheetItems extends React.Component {
  render() {
    let {
      reactions,
      filter,
      price_input_type,
      price_output_type,
      prices
    } = this.props;
    filter = filter.toString().toLowerCase();

    let reactionList = map(reactions, (v, i) => {
      let inputItems = map(v.input, "item_name");

      inputItems.push(v["item_name"]);
      let ftd = map(inputItems, v => {
        return v.toLowerCase();
      });
      ftd = ftd.join(",");
      let preparedData = null;
      if (ftd.indexOf(filter) !== -1) {
        preparedData = (
          <OneItem
            key={i}
            item={v}
            prices={this.props.prices}
            price_input={prices[price_input_type]}
            price_output={prices[price_output_type]}
          />
        );
      }
      return preparedData;
    });
    return <div>{reactionList}</div>;
  }
}

export default connect(state => state.moonSheetReducer, {})(SheetItems);
