import React from "react";
import { connect } from "react-redux";
import Helper from "./../../../../app/helpers";

class OneItem extends React.Component {
  render() {
    let { item } = this.props;

    let inputItems = item["input"].map((v, i) => {
      return (
        <div key={i} className="row">
          <div className="col-md-6">{v.item_name}</div>
          <div className="col-md-6">{Helper.qty(v.quantity)}</div>
        </div>
      );
    });

    return (
      <div className="row">
        <div className="col-md-12">
          <table className="inside">
            <thead>
              <tr>
                <th colSpan="2">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center"
                    }}
                  >
                    <span>{item.item_name}</span>
                    <span className="txt-normal">
                      {Helper.qty(item.quantity)}
                    </span>
                  </div>

                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="2" className="inside-table">
                  {inputItems}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default connect(state => state.moonSheetReducer, {})(OneItem);
