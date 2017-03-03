import React, { Component } from "react";
import { connect } from "react-redux";
import { ItemComponentView, ItemView } from "../item";
import {
  changeBuildComponents,
  changeMeTeComponents,
  updateVariable
} from "../../actions/manufactureActions";
import Helper from "./../../helpers";
import { map, forEach, findIndex } from "lodash";

class BuildOwnComponents extends Component {
  showCopyPasteZone() {
    let status = !this.props.is_build_own;
    this.props.changeBuildComponents(status);
  }

  changeMeTeComponents(mete, event) {
    this.props.changeMeTeComponents("component_" + mete, event.target.value);
  }

  ownType(type) {
    this.props.updateVariable("own_vtype", type);
  }

  render() {
    const {
      own_vtype,
      own_amount,
      component_te,
      component_me,
      prices,
      build_components,
      me,
      facility_val,
      run,
      type_p_components
    } = this.props;
    let cmps = Helper.manufactureQty(
      build_components,
      me,
      facility_val.me,
      run
    );

    let _components = cmps.map(val => {
      let typePrices = prices[type_p_components];
      return (
        <ItemComponentView
          component_me={component_me}
          facility_me={facility_val.me}
          components={val.components}
          key={val.item_id}
          typeID={val.item_id}
          name={val.item_name}
          prices={typePrices}
          quantity={val.qty}
        />
      );
    });

    // calculate group components
    let ParentComponents = map(cmps, "components");
    let GroupComponents = [];
    let uniqueOwnComponents = [];

    forEach(ParentComponents, v => {
      forEach(v, item => {
        GroupComponents.push(item);
      });
    });

    forEach(GroupComponents, v => {
      let index = findIndex(uniqueOwnComponents, { item_id: v.item_id });
      if (index !== -1) {
        uniqueOwnComponents[index].qty += v.qty;
      } else {
        uniqueOwnComponents.push(v);
      }
    });

    let _grouped = uniqueOwnComponents.map(val => {
      let typePrices = prices[type_p_components];
      return (
        <ItemView
          component_me={component_me}
          facility_me={facility_val.me}
          components={val.components}
          key={val.item_id}
          typeID={val.item_id}
          name={val.item_name}
          price={typePrices[val.item_id]}
          quantity={val.qty}
        />
      );
    });

    let METE_panel = (
      <div>
        <select
          value={component_te}
          onChange={this.changeMeTeComponents.bind(this, "te")}
        >
          {[10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0].map(val => {
            return <option key={val} value={val}>TE {val}</option>;
          })}
        </select>
        <select
          value={component_me}
          onChange={this.changeMeTeComponents.bind(this, "me")}
        >
          {[10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0].map(val => {
            return <option key={val} value={val}>ME {val}</option>;
          })}
        </select>
      </div>
    );

    let components = (
      <div className="row">
        <div className="col-md-12">
          <table>
            <thead>
              <tr>
                <th
                  style={{
                    userSelect: "none",
                    display: "flex",
                    justifyContent: "space-between"
                  }}
                  className="pointer"
                >
                  <span onClick={this.showCopyPasteZone.bind(this)}>
                    Build Components ({Helper.shortNum(own_amount)} isk)
                  </span>
                  <span>
                    <div className="btn-group">
                      <button
                        onClick={this.ownType.bind(this, "h")}
                        className={own_vtype === "h" ? "active" : ""}
                      >
                        no
                      </button>
                      <button
                        onClick={this.ownType.bind(this, "e")}
                        className={own_vtype === "e" ? "active" : ""}
                      >
                        each component
                      </button>
                      <button
                        onClick={this.ownType.bind(this, "g")}
                        className={own_vtype === "g" ? "active" : ""}
                      >
                        group materials
                      </button>
                    </div>
                  </span>
                </th>
              </tr>
            </thead>
            <tbody
              className={["e", "g"].indexOf(own_vtype) !== -1 ? "" : "hide"}
            >
              <tr>
                <td>
                  <ul className="components list">
                    <li
                      style={{
                        textAlign: "right"
                      }}
                    >
                      <span>{METE_panel}</span>
                    </li>
                    {own_vtype === "e" ? _components : _grouped}
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
    return build_components.length ? components : null;
  }
}
export default connect(state => state.manufactureReducer, {
  changeBuildComponents,
  changeMeTeComponents,
  updateVariable
})(BuildOwnComponents);
