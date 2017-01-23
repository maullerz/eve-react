import React, { Component } from 'react'
import OneColumnTable from '../item/OneColumnTable'
import { connect } from 'react-redux'
import { addItem } from '../../actions/itemActions'
import { browserHistory } from 'react-router'
import { setHead } from '../../actions/appActions'


class PopularItems extends Component {

  changeItem(item) {
    this.props.addItem(item)
    browserHistory.push("/item/" + item.url)
    this.props.setHead({
      headTitle: this.props.headTitle + ", " + item.item_name,
      headDescription: this.props.headDescription,
      headKeywords: this.props.headKeywords + ", eve " + item.item_name.toLowerCase()
    })
    window.scrollTo(0, 0)
  }
  render() {
    return this.props.items.length ? <OneColumnTable _class='td-padd-rb' clickItem={this.changeItem.bind(this)} title="Popular components" list={this.props.items} /> : null
  }
}

export default connect(state => state.itemReducer, { addItem, setHead })(PopularItems)
