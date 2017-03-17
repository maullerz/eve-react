import React from "react";
import { connect } from "react-redux";
import { map } from "lodash";

import OneItem from "./OneItem";

class SheetItems extends React.Component {
  constructor() {
    super();
    this.reactionList = [];
  }

  componentWillReceiveProps(np) {
    this.reactionList = np.reactions.map((v, i) => {
      let filter = np.filter.toString().toLowerCase();
      let inputItems = map(v.input, "item_name");

      inputItems.push(v["item_name"]);
      let filtered = map(inputItems, v => {
        return v.toLowerCase();
      });
      return filtered.join("|").indexOf(filter) >= 0
        ? <OneItem key={i} item={v} />
        : null;
    });
  }

  render() {
    return <div>{this.reactionList}</div>;
  }
}

export default connect(state => state.moonSheetReducer, {})(SheetItems);
