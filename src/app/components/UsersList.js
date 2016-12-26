import React, {Component} from 'react'
import Helper from '../helpers'
import ReactTooltip from 'react-tooltip'

export default class UsersList extends Component {
  render() {
    let additionBlock = ''
    if (this.props.char.sum) {
      additionBlock = Helper.price(this.props.char.sum) + ' ISK'
    }
    if (this.props.char.description) {
      additionBlock = this.props.char.description
    }
    let rand_id = 'id-' + Math.ceil(Math.random() * 1000000000)
    return (
      <div className='inline user_img' data-tip data-for={rand_id}>
        <img alt={this.props.char.char_name}
             src={'https://image.eveonline.com/Character/' + this.props.char.char_id + '_64.jpg'}/>
        <ReactTooltip class="reactToolTip" delayHide={0} id={rand_id} type='dark' effect='solid'>
          <div className="b">{this.props.char.char_name ? this.props.char.char_name : '' }</div>
          <div>{additionBlock}</div>
        </ReactTooltip>
      </div>
    )
  }
}
