import React, {Component} from "react";

export default class SimilarItems extends Component {

  render() {
    const li = this.props.list.map(function (val, index) {
      return <li key={index}>{val}</li>;
    });
    return (
      <ul>{li}</ul>
    );
  }
}