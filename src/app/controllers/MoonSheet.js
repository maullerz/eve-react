import React from "react";
import { connect } from "react-redux";
import { unmountMoonSheet, getSheet, getPrices, getPricesMarketer, updateVar } from "../actions/moonsheetActions";
import { setHead } from "../actions/appActions";

// components
import Panel from "./../components/resourses/moonsheet/Panel";
import SheetItems from "./../components/resourses/moonsheet/SheetItems";
import FilterPanel from "./../components/resourses/moonsheet/FilterPanel";

class MoonSheet extends React.Component {
  componentDidMount() {
    let {
      headTitle,
      headDescription,
      headKeywords,
      setHead,
      getSheet
    } = this.props;
    setHead({
      headTitle: headTitle,
      headDescription: headDescription,
      headKeywords: headKeywords
    });
    getSheet();
  }

  componentWillUnmount() {
    this.props.unmountMoonSheet();
  }

  excludeUnrefItems(reactions, ids) {
    // because we dont use price of unrefined items for calculations
    const result = []
    ids.forEach(id => {
      const name = reactions.find(r => r.item_id === id).item_name
      if (name.indexOf('Unref') === -1) {
        result.push(id)
      } else {
        // console.log('excuded:', name)
      }
    })
    return result
  }

  componentWillReceiveProps(np) {
    let { getPrices, getPricesMarketer, input_system_id, output_system_id, updateVar, items_input, items_output, reactions } = np;
    if (np._need_upd_price_input && items_input.length) {
      // getPrices(input_system_id, items_input.join(","));
      getPricesMarketer(input_system_id, items_input.join("&typeid="));
      updateVar("_need_upd_price_input", false);
    }
    const typeIds = this.excludeUnrefItems(reactions, items_output)
    if (np._need_upd_price_output && typeIds.length) {
      getPricesMarketer(output_system_id, typeIds.join("&typeid="));
      updateVar("_need_upd_price_output", false);
    }
  }
  render() {
    return (
      <div>
        <FilterPanel />
        <div className="row">
          <div className="col-md-4 t-a_l col-first">
            <Panel />
          </div>
          <div className="col-md-8 t-a_l col-last">
            <SheetItems title="Moon materials" />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(state => state.moonSheetReducer, {
  unmountMoonSheet,
  setHead,
  getSheet,
  getPrices,
  getPricesMarketer,
  updateVar,
})(MoonSheet);
