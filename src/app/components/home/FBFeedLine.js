import React, {Component} from 'react'
export default class FBFeedLine extends Component {

  render() {
    return (<div>
      <div className="txt-yellow small-date t-a_r">{this.props.created_at}</div>
      <div dangerouslySetInnerHTML={{__html: this.props.message}}></div>
    </div>)
  }
}