import React, { Component } from 'react'
import OneColumnTable from '../components/OneColumnTable'
import { connect } from 'react-redux'
import { getDonatorList, unmountDonate } from "../actions/donateActions"
import { setHead } from "../actions/appActions"

class Donate extends Component {

  componentDidMount() {
    this.props.getDonatorList()
  }

  com

  componentWillMount() {
    this.props.setHead({
      headTitle: this.props.headTitle,
      headDescription: this.props.headDescription,
      headKeywords: this.props.headKeywords
    })
  }

  componentWillUnmount() {
    this.props.unmountDonate()
  }

  render() {
    return (
      <div>
        <div className='row'>
          <div className='col-md-12 t-a_l'>
            <OneColumnTable _class='td-padd-rb' title={this.props.title_authors} list={this.props.authors} />
          </div>
        </div>
        <div className='row'>
          <div className='col-md-4 t-a_l col-first'>
            <OneColumnTable _class='td-padd-rb' title={this.props.title_contributors} list={this.props.contributors} />
          </div>
          <div className='col-md-8 t-a_l col-last'>
            <OneColumnTable _class='td-padd-rb' title={this.props.title_donators} list={this.props.donators} />
          </div>
        </div>
      </div>
    )
  }
}
export default connect(state => state.donateReducer, { getDonatorList, unmountDonate, setHead })(Donate)
