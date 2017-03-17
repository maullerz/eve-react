import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getBpc,
  unmountManufacture,
  getStructures
} from "../actions/manufactureActions";
import { setHead } from "../actions/appActions";
// components
import SearchBpoPanel from "./../components/manufacture/SearchBpoPanel";
import UsedIn from "./../components/manufacture/UsedIn";
import BpoComponents from "./../components/manufacture/BpoComponents";
import Calculator from "./../components/manufacture/Calculator";
import BuildOwnComponents from "./../components/manufacture/BuildOwnComponents";

class Manufacture extends Component {
  componentWillReceiveProps(np) {
    if (this.props.params.url !== np.params.url) {
      this.props.getBpc(np.params.url);
    }
    if (this.props.bpc_title !== np.bpc_title) {
      this.props.setHead({
        headTitle: this.props.headTitle + " " + np.bpc_title,
        headDescription: this.props.headDescription + " " + np.bpc_title,
        headKeywords: this.props.headKeywords +
          ", " +
          np.bpc_title.toLowerCase()
      });
    }
  }

  componentWillMount() {
    this.props.getStructures();
    if (this.props.params.url && !this.props.bpc_title) {
      this.props.getBpc(this.props.params.url);
    }
    this.props.setHead({
      headTitle: this.props.headTitle,
      headDescription: this.props.headDescription,
      headKeywords: this.props.headKeywords
    });
  }

  componentWillUnmount() {
    this.props.unmountManufacture();
  }

  render() {
    return (
      <div>
        <SearchBpoPanel />
        <div className="row">
          <div className="col-md-6 t-a_l col-first">
            <Calculator />
            <UsedIn />
          </div>
          <div className="col-md-6 t-a_l col-last">
            <BuildOwnComponents />
            <BpoComponents />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(state => state.manufactureReducer, {
  getBpc,
  unmountManufacture,
  setHead,
  getStructures
})(Manufacture);
