import React, {Component} from "react";
import Copyright from "../components/blocks/_copyright";
import PanelContent from "../components/blocks/_panel_content";
import IndexTables from "../components/blocks/_index_tables";

class Home extends Component {

  render() {
    return (
      <div>
        <IndexTables />
        <PanelContent />

        <div className="row">
          <div className="col-md-12">
            <table>
              <thead>
              <tr>
                <th className="t-a_l">Market</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td className="padd-3"></td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
        <Copyright />
      </div>
    );
  }
}

export default Home;