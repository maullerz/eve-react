import React from "react"
import { connect } from "react-redux"
import { map } from "lodash"
import startsWith from 'lodash/startsWith'

import OneItem from "./OneItem"
import refinedOutputs from './refinedOutputs.json'


const ReprocessRatio = 0.52
const ScrapmetalSkill = 1.1


export class SettingsPanel extends React.Component {
  render() {
    const { expanded, onExpand } = this.props
    return (
      <div className="row" className="row">
        <div style={{ padding: '5px 15px' }}>
          <button onClick={onExpand} className={expanded ? "active" : ""}>
            {expanded ? '[-]' : '[+]'}
          </button>
        </div>
      </div>
    );
  }
}

const getProfit = (item, props) => {
  const { price_input_type, price_output_type, prices } = props
  let inputAmount = 0
  item.input.forEach((v, i) => {
    let amount = v.quantity * prices[price_input_type][v.item_id]
    inputAmount += amount
  })
  let amount = prices[price_output_type][item.item_id] * item.quantity;
  let profit = amount - inputAmount;
  return profit
}

const getUnrefProfit = (item, props) => {
  const { price_input_type, price_output_type, prices } = props
  let inputAmount = 0
  item.input.forEach((v, i) => {
    let amount = v.quantity * prices[price_input_type][v.item_id]
    inputAmount += amount
  })
  let outputAmount = 0
  const outputs = refinedOutputs[item.item_id]
  outputs.forEach(item => {
    const amount = Math.trunc(item.quantity * ReprocessRatio * ScrapmetalSkill)
    outputAmount += (prices[price_output_type][item.typeId] * amount)
  })
  let profit = outputAmount - inputAmount;
  return profit
}

const sortCalcFunc = (item, props) => {
  const isUnref = startsWith(item.item_name, 'Unref')
  return isUnref
    ? getUnrefProfit(item, props)
    : getProfit(item, props)
}

class SheetItems extends React.Component {
  constructor() {
    super()
    this.state = {
      expanded: false,
    }
  }

  handleExpandClick() {
    this.setState({ expanded: !this.state.expanded })
  }

  sortReactions(reactions) {
    return reactions.sort((a, b) => {
      const diffA = sortCalcFunc(a, this.props)
      const diffB = sortCalcFunc(b, this.props)
      return diffB - diffA
    })
  }

  getReactionsList(reactions) {
    const { filter, price_input_type, price_output_type, prices } = this.props

    return map(reactions, (v, i) => {
      let inputItems = map(v.input, "item_name")
      inputItems.push(v.item_name)
      let ftd = map(inputItems, v => v.toLowerCase())
      ftd = ftd.join(",")

      if (ftd.indexOf(filter.toString().toLowerCase()) === -1) return null;

      const isUnref = startsWith(v.item_name, 'Unref')

      return (
        <OneItem
          key={i}
          item={v}
          unrefined={isUnref}
          getProfit={isUnref ? getUnrefProfit : getProfit}
          expanded={this.state.expanded}
          prices={prices}
          price_input_type={price_input_type}
          price_output_type={price_output_type}
        />
      )
    })
  }

  render() {
    const { reactions } = this.props;
    const sortedReactions = this.sortReactions(reactions)
    const reactionList = this.getReactionsList(sortedReactions)

    return (
      <div>
        <SettingsPanel
          expanded={this.state.expanded}
          onExpand={this.handleExpandClick.bind(this)}
        />
        {reactionList}
      </div>
    )
  }
}

export default connect(state => state.moonSheetReducer, {})(SheetItems);
