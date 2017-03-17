import React from 'react'
import {connect} from 'react-redux'

import OneItem from './OneItem'

class SheetItems extends React.Component {

  constructor() {
    super()
    this.reactionList = []
  }

  componentWillReceiveProps(np) {
    this.reactionList = np.reactions.map(v => {
      let filter = np.filter.toString().toLowerCase()
      return v['item_name'].toLowerCase().indexOf(filter) >= 0 ? <OneItem item={v} /> : null
    })
  }

  render() {
    return <div>{this.reactionList}</div>
  }
}

export default connect(state => state.moonSheetReducer, {})(SheetItems)