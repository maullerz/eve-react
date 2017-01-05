import React, {Component} from 'react'
import {connect} from 'react-redux'
import SearchItemPanel from '../components/item/SearchItemPanel'
import {unmountItem} from './actions/itemActions'

class Item extends Component {

  componentWillUnmount() {
    this.props.unmountItem()
  }

  render() {
    return (
      <div>
        <SearchItemPanel />
      </div>
    )
  }
}
function mapStateToProps (state) {
  return state.itemReducer
}
export default connect(mapStateToProps, {unmountItem})(Item)
