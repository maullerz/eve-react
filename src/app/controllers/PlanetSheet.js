import React from "react";
import {connect} from "react-redux";
import {unmountPlanetSheet, getSheet, getPrices, updateVars} from "../actions/planetSheetActions";
import {setHead} from "../actions/appActions";

// components
import FilterPanel from "./../components/resourses/planetsheet/FilterPanel";
import Panel from "./../components/resourses/planetsheet/Panel";
import SheetItems from "./../components/resourses/planetsheet/SheetItems";

class PlanetSheet extends React.Component {
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
    this.props.unmountPlanetSheet();
  }

  componentWillReceiveProps(np) {
    let {input_system_id, getPrices, _need_upd_price_input, _need_upd_price_output, output_system_id, updateVars, items_input, items_output} = np;
    if (_need_upd_price_input && items_input.length) {
      getPrices(input_system_id, items_input.join(","), 'input');
      updateVars({_need_upd_price_input: false});
    }
    if (_need_upd_price_output && items_output.length) {
      getPrices(output_system_id, items_output.join(","), 'output');
      updateVars({_need_upd_price_output: false});
    }
  }

  render() {
    return (
      <div>
        <FilterPanel />
        <div className="row">
          <div className="col-md-4 col-sm-4 col-lg-4 t-a_l col-first">
            <Panel />
          </div>
          <div className="col-md-8 col-sm-8 col-lg-8 t-a_l col-last">
            <SheetItems title="Planet materials"/>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(state => state.planetSheetReducer, {
  unmountPlanetSheet,
  setHead,
  getSheet,
  getPrices,
  updateVars
})(PlanetSheet);
