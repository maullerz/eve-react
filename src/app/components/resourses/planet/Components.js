import React from 'react'
import {connect} from 'react-redux'
import Helper from '../../../helpers'

class Components extends React.Component {

  render() {
    let _inputComponents = this.props.materials.map((val) => {
      let itemId = val.item_id
      let price = this.props.prices[this.props.type_price_input][itemId]
      return (<li key={val.item_id}>
        <div className='containter'>
          <div className='img-box'>
            <img
              alt={val.item_name}
              src={'https://image.eveonline.com/Type/' + val.item_id + '_32.png'}/>
          </div>
          <div className='text-holder'>
            {val.item_name} x {Helper.qty(val.quantity)} (<span className='txt-lime'>{Helper.price(price)}</span>)
            <div>
              <span className='txt-yellow b'>{Helper.price(price * val.quantity * this.props.x)} ISK</span>
            </div>
          </div>
        </div>
      </li>)
    })

    let scheme = this.props.scheme
    let outputPrice = this.props.prices[this.props.type_price_output][this.props.scheme.typeID]

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
                    <li key={scheme.typeID}>
                      <div className='containter'>
                        <div className='img-box'>
                          <img
                            alt={scheme.schema_name}
                            src={'https://image.eveonline.com/Type/' + scheme.typeID + '_32.png'}/>
                        </div>
                        <div className='text-holder'>
                          {scheme.schema_name} x {Helper.qty(scheme.quantity)} (<span
                          className='txt-lime'>{Helper.price(outputPrice)}</span>)
                          <div>
                            <span className='txt-yellow b'>{Helper.price(outputPrice * scheme.quantity * this.props.x)} ISK</span>
                          </div>
                        </div>
                      </div>
                    </li>
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

export default connect(state => state.planetReducer, {})(Components)
