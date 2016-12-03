import React, {Component} from "react";

export default class panel_content extends Component {

  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="panel-content">{this.props.title}</div>
        </div>
      </div>
    );
  }
}