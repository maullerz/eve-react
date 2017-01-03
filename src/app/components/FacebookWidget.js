import React, {Component} from 'react'

export default class FacebookWidget extends Component {

  render () {
    return (
      <table>
        <thead>
          <tr>
            <th className='t-a_l'>Follow us on <a target='_blank' className='theadA' href='https://www.facebook.com/eve.productions.org/'>Facebook</a></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={this.props._class}>{this.props.list}</td>
          </tr>
        </tbody>
      </table>
    )
  }
}
