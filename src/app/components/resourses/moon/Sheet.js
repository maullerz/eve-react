import React from 'react'
import {connect} from 'react-redux'
import startsWith from 'lodash/startsWith'
import Helper from '../../../helpers'
import {getSchemes, updPrice} from './../../../actions/moonActions'
import schemes from './sheet_schemes.json'
// import materials from './invTypeMaterials.json'
import refinedOutputs from './refinedOutputs.json'

import './Sheet.css'


const PriceType = 'sell'

const ReprocessRatio = 0.52
const ScrapmetalSkill = 1.1


const getReaction = name => {
  const key = Object.keys(schemes).find(
    key => (schemes[key].name === `${name} Reaction`)
  )
  return {
    id: parseInt(key, 10),
    ...schemes[key],
  }
}


const calculateInputOutputDiff = (item, prices) => {
  console.log('calculateInputOutputDiff:', item)
  const output = item.output
  const input = item.input

  const outputPrice = prices[PriceType][output.typeId]
  let inputSumPrice = 0
  input.forEach(item => inputSumPrice += prices[PriceType][item.typeId] * item.amount)
  const diff = outputPrice * output.amount - inputSumPrice

  return diff
}


const calculateUnrefInputOutputDiff = (item, prices) => {
  const outputs = refinedOutputs[item.output.typeId]
  const inputs = item.input

  let inputSumPrice = 0
  inputs.forEach(item => inputSumPrice += prices[PriceType][item.typeId] * item.amount)

  let outputSumPrice = 0
  outputs.forEach(item => {
    const amount = Math.trunc(item.quantity * ReprocessRatio * ScrapmetalSkill)
    outputSumPrice += (prices[PriceType][item.typeId] * amount)
    // console.log('item.quantity:', item.quantity, amount, outputSumPrice)
  })

  const diff = outputSumPrice - inputSumPrice
  // console.log('diff:', diff, outputSumPrice, inputSumPrice)
  return diff
}


const Input = props => {
  const data = props.data
  const price = props.prices[PriceType][data.typeId]
  return (
    <div className='in-root'>
      <img alt={data.name} src={`https://image.eveonline.com/Type/${data.typeId}_32.png`} />
      <div>{data.name}</div>
      <div>{Helper.qty(data.amount * data.volume)}m3</div>
      <div>{Helper.qty(price * data.amount)}</div>
    </div>
  )
}


const Output = props => {
  const data = props.data
  const price = props.prices[PriceType][data.typeId]
  data.amount = Math.trunc(data.quantity * ReprocessRatio * ScrapmetalSkill)
  // console.log('output:', data.typeId, price, data.amount)
  return (
    <div className='in-root'>
      <div style={{ width: 10 }}>
      </div>
      <img alt={data.name} src={`https://image.eveonline.com/Type/${data.typeId}_32.png`} />
      <div style={{ width: 160 }}>{data.name}</div>
      {props.showAmount && <div style={{ width: 160 }}>
        {`${data.amount} (${Helper.qty(data.quantity)})`}
      </div>}
      <div>{Helper.qty(data.amount * data.volume)}m3</div>
      <div>{Helper.qty(price * data.amount)}</div>
    </div>
  )
}


const Reaction = props => {
  const data = props.data
  console.log('Reaction:', data)
  const output = data.output
  const input = data.input
  const outputPrice = props.prices[PriceType][output.typeId]
  const diff = props.isUnref ?
    calculateUnrefInputOutputDiff(data, props.prices)
    :
    calculateInputOutputDiff(data, props.prices)

  return (
    <div className='r-root'>
      <div className='r-title'>
        <div>{output.name}</div>
        <img alt={data.name} style={{ width: 40 }} src={`https://image.eveonline.com/Type/${output.typeId}_32.png`} />
        {false && <div>{Helper.qty(output.amount)}</div>}
        <strong className={diff <= 0 ? 'negative' : ''}>
          {Helper.qty(diff)}
        </strong>
        <div>{props.isUnref ? '' : Helper.qty(output.volume * output.amount)+'m3'}</div>
        <div>{props.isUnref ? '' : Helper.qty(outputPrice * output.amount)}</div>
      </div>
      <div className='r-content'>
        {input.map(item => <Input data={item} key={item.typeId} prices={props.prices} />)}
      </div>
      {props.isUnref && <div className='r-content'>
        {refinedOutputs[output.typeId].map(
          item => <Output showAmount data={item} key={item.name} prices={props.prices} />
        )}
      </div>}
    </div>
  )
}


class Sheet extends React.Component {
  constructor(props) {
    super(props)
    this.pricesUpdated = false
  }

  componentDidMount() {
    this.props.getSchemes()
  }

  sortReactions(reactions) {
    const { prices } = this.props
    const calcFunc = (item, prices) => {
      const isUnref = startsWith(item.name, 'Unref')
      console.log('sortReactions:', item)
      return isUnref ?
        calculateUnrefInputOutputDiff(item, prices) :
        calculateInputOutputDiff(item, prices)
    }

    return reactions.sort((a, b) => {
      const diffA = calcFunc(a, prices)
      const diffB = calcFunc(b, prices)
      return diffB - diffA
    })
  }

  updatePrices(items) {
    if (!this.pricesUpdated) {
      this.pricesUpdated = true
      const inputIds = [].concat.apply([], items.map(item => {
        const ids = [item.output.typeId]
        return [].concat.apply(ids, item.input.map(input => input.typeId))
      }))
      const allIds = inputIds.filter((item, pos) => inputIds.indexOf(item) === pos)
      this.props.updPrice(this.props.input_system_id, allIds)
    }
  }

  render() {
    const { schemes, prices, materials } = this.props
    // const parsed = schemes['499']
    const parsed = schemes['500']
    // const parsed = schemes['500'].filter(item => startsWith(item.item_name, 'Unref'))
    const intermediates = parsed.map(item => getReaction(item.item_name))

    if (!intermediates.length) return null

    intermediates.length && !this.pricesUpdated && this.updatePrices(schemes['500'].map(item => getReaction(item.item_name)))
    // console.log('schemes:', intermediates[0])
    // console.log('materials:', materials)

    const sorted = this.sortReactions(intermediates)

    return (
      <div>
        {sorted.length && sorted.map(data => (
          <Reaction
            data={data}
            key={data.id}
            prices={prices}
            isUnref={startsWith(data.name, 'Unref')}
          />
        ))}
      </div>
    )
  }
}

export default connect(state => state.moonReducer, {getSchemes, updPrice})(Sheet)

// 501 // 427: Moon Materials
// 500 // 428: Intermediate Materials
// 499 // 429: Composite
