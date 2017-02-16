import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updNeed } from './../../actions/itemActions'
import Paginate from '../blocks/_paginate'
import { Link } from 'react-router'


class UsedIn extends Component {

  onChangePage(pageNum) {
    this.props.updNeed('page', pageNum)
    this.props.updNeed('_need_get_bpc', true)
  }

  render() {
    let used_in = this.props.used_in.map((val, index) => {
      return <li key={index}>
        <div className='m-b-1'>
          <Link to={'/manufacture/' + val.url}>
            <img
              className='img24'
              alt={val.blueprint_id}
              src={'https://image.eveonline.com/Type/' + val.blueprint_id + '_64.png'} />
            {val.blueprint_name} ({val.qty})
          </Link>
        </div>
      </li>
    })


    let usedIn = <div className='row'>
      <div className='col-md-12'>
        <table>
          <thead>
            <tr>
              <th>{this.props.item.item_name} Used In {this.props.total_pages > 1 ? '(' + this.props.total_pages + ' page' + (this.props.total_pages > 1 ? 's' : '') + ')' : ''}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <Paginate current={this.props.page} pages={this.props.total_pages} round={3} onChangePage={this.onChangePage.bind(this)} />
                <ul className='list'>{used_in}</ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    return this.props.item.hasOwnProperty('item_id') ? usedIn : null
  }
}

export default connect(state => state.itemReducer, { updNeed })(UsedIn)
