import React, {Component} from 'react'
import {connect} from 'react-redux'
import {updNeed} from './../../actions/itemActions'

import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';

class UsedIn extends Component {

  onChange(pageNum) {
    this.props.updNeed("page", pageNum)
    this.props.updNeed("_need_get_bpc", true)
  }

  render() {

    let used_in = this.props.used_in.map((val, index) => {
      return <li key={index}>
        <div className='m-b-1'>
          <img
            className='img24'
            alt={val.blueprint_id}
            src={'https://image.eveonline.com/Type/' + val.blueprint_id + '_64.png'}/>
          {val.blueprint_name} ({val.qty})
        </div>
      </li>
    })

    let usedIn = <div className='row'>
      <div className='col-md-12'>
        <table>
          <thead>
          <tr>
            <th>{this.props.item.item_name} Used In</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>
              <Pagination
                onChange={this.onChange.bind(this)}
                pageSize={this.props.limit}
                defaultCurrent={1}
                current={this.props.page}
                total={this.props.total_items}
              />
              <ul className='list'>{used_in}</ul>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    return this.props.item.hasOwnProperty("item_id") ? usedIn : null
  }
}

export default connect(state => state.itemReducer, {updNeed})(UsedIn)
