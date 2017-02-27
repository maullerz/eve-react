import React from 'react'
import {connect} from 'react-redux'
import Helper from '../../../helpers'
import { ItemView } from '../../item'


class Components extends React.Component {

  render() {
    let _inputComponents = this.props.materials.map((val) => {
      let itemId = val.item_id
      let price = this.props.prices[this.props.type_price_input][itemId]
      return (
        <ItemView
          key={val.item_id}
          typeID={val.item_id}
          name={val.item_name}
          price={price}
          quantity={val.quantity}
        />
      )
    })

    let scheme = this.props.scheme
    let outputPrice = this.props.prices[this.props.type_price_output][this.props.scheme.item_id]

    let blockComponents = (
      <div>
        <div className='row'>
          <div className='col-md-12'>
            <table>
              <thead>
              <tr>
                <th>Input materials ({Helper.shortNum(this.props.input_volume)} m3)</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>
                  <ul className='components list'>
                    {_inputComponents}
                  </ul>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="row">
          <div className='col-md-12'>
            <table>
              <thead>
              <tr>
                <th>Output material ({Helper.shortNum(this.props.output_volume)} m3)</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>
                  <ul className='components list'>
                    <ItemView
                      typeID={scheme.item_id}
                      name={scheme.item_name}
                      price={outputPrice}
                      quantity={scheme.quantity}
                    />
                  </ul>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
    return _inputComponents.length ? blockComponents : null
  }
}

export default connect(state => state.moonReducer, {})(Components)
