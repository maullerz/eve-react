import React from "react";
import {connect} from "react-redux";
import {updateVars} from "../../../actions/gasActions";

class FilterPanel extends React.Component {
  makeFilter(e) {
    this.props.updateVars({filter: e.target.value});
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-12 col-sm-12 col-lg-12 col-xs-12">
          <div className="panel-content">
            <h1>Gas Sheet</h1>
            <input
              placeholder="Filter materials"
              onChange={this.makeFilter.bind(this)}
              className="input-search"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(state => state.gasReducer, {updateVars})(FilterPanel);
