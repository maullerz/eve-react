import React, {Component} from "react";
import Helper from "../helpers"

export default class UsersList extends Component {
  render() {

    let additionBlock = "";
    if (this.props.char.sum) {
      additionBlock = Helper.shortNum(this.props.char.sum)
    }
    if (this.props.char.description) {
      additionBlock = this.props.char.description
    }

    return (
      <div className="inline user_img">
        <img alt={this.props.char.char_name}
             src={"https://image.eveonline.com/Character/" + this.props.char.char_id + "_64.jpg"}/>
        <div className="donatedSum">{additionBlock}</div>
      </div>
    );
  }
}