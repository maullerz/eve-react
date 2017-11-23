import React from 'react';
import {connect} from 'react-redux';
import {map} from 'lodash';
import startsWith from 'lodash/startsWith';

import OneItem from './OneItem';
import refinedOutputs from './refinedOutputs.json';

// components
import ShortList from './ShortList'

const ReprocessRatio = 0.52;
const ScrapmetalSkill = 1.1;

const getProfit = (item, props) => {
  const {price_input_type, price_output_type, prices} = props;
  let inputAmount = 0;
  item.input.forEach((v, i) => {
    inputAmount += v.quantity * prices[price_input_type][v.item_id];
  });
  let amount = prices[price_output_type][item.item_id] * item.quantity;
  return amount - inputAmount;
};

const getUnrefProfit = (item, props) => {
  const {price_input_type, price_output_type, prices} = props;
  let inputAmount = 0;
  item.input.forEach(v => {
    inputAmount += v.quantity * prices[price_input_type][v.item_id];
  });
  let outputAmount = 0;
  const outputs = refinedOutputs[item.item_id];
  outputs.forEach(item => {
    const amount = Math.trunc(item.quantity * ReprocessRatio * ScrapmetalSkill);
    outputAmount += prices[price_output_type][item.typeId] * amount;
  });
  return outputAmount - inputAmount;
};

const sortCalcFunc = (item, props) => {
  const isUnref = startsWith(item.item_name, 'Unref');
  const profit = isUnref ? getUnrefProfit(item, props) : getProfit(item, props);
  return profit * (isUnref ? 60.0/225.0 : 60.0/113.0)
};

class SheetItems extends React.Component {
  sortReactions(reactions) {
    return reactions.sort((a, b) => {
      const diffA = sortCalcFunc(a, this.props);
      const diffB = sortCalcFunc(b, this.props);
      return diffB - diffA;
    });
  }

  getReactionsList(reactions) {
    const {filter, price_input_type, price_output_type, prices, list_type} = this.props;
    if (reactions.length === 0) {
      return null;
    }
    let resultList = map(reactions, (v, i) => {
      let inputItems = map(v.input, 'item_name');
      inputItems.push(v.item_name);
      let ftd = map(inputItems, v => v.toLowerCase());
      ftd = ftd.join(',');

      if (ftd.indexOf(String(filter).toLowerCase()) === -1) {
        return null;
      }
      const isUnref = startsWith(v.item_name, 'Unref');

      // Without unref
      // if (isUnref) return null

      const FullList = <OneItem
        key={i}
        item={v}
        list_type={list_type}
        unrefined={isUnref}
        getProfit={isUnref ? getUnrefProfit : getProfit}
        prices={prices}
        price_input_type={price_input_type}
        price_output_type={price_output_type}
      />

      const shortList = <ShortList
        key={i}
        item={v}
        list_type={list_type}
        unrefined={isUnref}
        getProfit={isUnref ? getUnrefProfit : getProfit}
        prices={prices}
        price_input_type={price_input_type}
        price_output_type={price_output_type}
      />

      return list_type === 'full' ? FullList : shortList;
    });

    return list_type === 'full' ? <div>{resultList}</div> : (
      <div className="row">
        <div className="col-md-12">
          <table className="inside">
            <thead>
            <tr>
              <th colSpan="2">
                <div className="flex-between">
                  <div>Reactions</div>
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
    const {reactions} = this.props;
    const sortedReactions = this.sortReactions(reactions);
    return this.getReactionsList(sortedReactions);
  }
}

export default connect(state => state.moonSheetReducer, {})(SheetItems);
