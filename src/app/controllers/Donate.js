import React, { Component } from 'react'
import OneColumnTable from '../components/OneColumnTable'
import { connect } from 'react-redux'
import { getDonatorList } from "../actions/donateActions"

class Donate extends Component {

  componentDidMount() {
    this.props.getDonatorList()
  }

  render() {

    return (
      <div>
        <div className='row'>
          <div className='col-md-12 t-a_l'>
            <OneColumnTable _class='td-padd-rb' title={this.props._donate.authors.title} list={this.props._donate.authors.list} />
          </div>
        </div>
        <div className='row'>
          <div className='col-md-4 t-a_l col-first'>
            <OneColumnTable _class='td-padd-rb' title={this.props._donate.contribute.title} list={this.props._donate.contribute.list} />
          </div>
          <div className='col-md-8 t-a_l col-last'>
            <OneColumnTable _class='td-padd-rb' title={this.props._donate.donators.title} list={this.props._donate.donators.list} />
          </div>
        </div>
      </div>
    )

  }
}

const mapStateToProps = state => {
  return {
    _donate: state.donateReducer,
    _app: state.appReducer
  }
}
export default connect(mapStateToProps, { getDonatorList })(Donate)
