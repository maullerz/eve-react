import React, { Component } from 'react'
import { connect } from 'react-redux'
import { sendBody } from '../../actions/marketActions'
import { debounce } from 'lodash'
import Helper from '../../helpers'

class Priceall extends Component {

  constructor(props) {
    super(props)
    this.state = {
      // for debug develop:
      // body: "449,555   Fernite Carbide\n100,498   Sylramic Fibers\n8,707     Phenolic Composites\n8,371     Fullerides\n4,330     Plasmonic Metamaterials\n4,109     Nanotransistors\n703       Hypersynaptic Fibers\n630       Ferrogel\n95        Fermionic Condensates",
      body: '',
      isOpen: true
    }
    this.debounceSendBody = debounce(this.sendBodyPriceall.bind(this), Helper.const.debounceTimeout)
  }

  showCopyPasteZone() {
    this.setState({ isOpen: !this.state.isOpen })
  }

  sendBodyPriceall() {
    this.props.sendBody(this.state.body)
  }

  changeBody(event) {
    this.setState({ body: event.target.value })
  }
  resetBody() {
    this.setState({ body: '' })
  }

  render() {
    return <div className='row'>
      <div className='col-md-12'>
        <table>
          <thead>
            <tr>
              <th onClick={this.showCopyPasteZone.bind(this)} className='pointer'>[{this.state.isOpen ? '-' : '+'}] Copy & Paste from EVE Client</th>
            </tr>
          </thead>
          <tbody className={this.state.isOpen ? '' : 'hide'}>
            <tr>
              <td className='inside-table-form'>
                <div className='row'>
                  <div className='col-md-12 t-a_r'>
                    <textarea rows='4' cols='5' className='w100 price-textarea' value={this.state.body} onChange={this.changeBody.bind(this)} />
                    <button onClick={this.resetBody.bind(this)} className={this.state.body.trim().length === 0 ? 'hide' : ''}>
                      Reset
                  </button>
                    <button onClick={this.debounceSendBody} className={this.state.body.trim().length === 0 ? 'hide' : ''}>
                      Send
                  </button>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  }
}

function mapStateToProps(state) {
  return state.marketReducer
}
export default connect(mapStateToProps, { sendBody })(Priceall)
