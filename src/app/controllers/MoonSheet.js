import React from "react";
import { connect } from "react-redux";
import { unmountMoonSheet, getSheet, getPrices, updateVar } from "../actions/moonsheetActions";
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

  componentWillReceiveProps(np) {
    let { getPrices, input_system_id, output_system_id, updateVar, items_input, items_output } = np;
    if (np._need_upd_price_input && items_input.length) {
      getPrices(input_system_id, items_input.join(","));
      updateVar("_need_upd_price_input", false);
    }
    if (np._need_upd_price_output && items_output.length) {
      getPrices(output_system_id, items_output.join(","));
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
          <div className="col-md-4 t-a_l col-midd">
            <SheetItems title="Moon materials" />
          </div>
          <div className="col-md-4 t-a_l col-last" />
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
  updateVar
})(MoonSheet);
