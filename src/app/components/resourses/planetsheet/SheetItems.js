import React from 'react';
import {connect} from 'react-redux';
import {map} from 'lodash';
import startsWith from 'lodash/startsWith';

const getProfit = (item, props) => {
  return 0
};

class SheetItems extends React.Component {

  // Sort schemes
  sortReactions(schemes) {
    return schemes
  }

  getMaterialList(schemes) {
    const {filter, price_input_type, price_output_type, prices, list_type} = this.props;
    if (schemes.length === 0) {
      return null;
    }
    let resultList = map(schemes, (v,i) => {
      let inputItems = map(v.input, 'item_name');
      inputItems.push(v.schema_name);
      let ftd = map(inputItems, v => v.toLowerCase());
      ftd = ftd.join(',');


      if (ftd.indexOf(String(filter).toLowerCase()) === -1) {
        return null;
      }

      return <div key={i}>{v.schema_name}</div>
    });
    return <p>{resultList}</p>
  }

  render() {
    const {schemes} = this.props;
    const sortedMaterials = this.sortReactions(schemes);
    return this.getMaterialList(sortedMaterials);
  }
}

export default connect(state => state.planetSheetReducer, {})(SheetItems);
