import React, {Component} from 'react'
import {connect} from 'react-redux'
import {unmountGas, getGasList} from "../actions/gasActions"
import {setHead} from "../actions/appActions"
import FilterPanel from '../components/resourses/gas/FilterPanel'
import Panel from '../components/resourses/gas/Panel'

class Gas extends Component {

  componentDidMount() {
    this.props.getGasList()
  }

  componentWillMount() {
    this.props.setHead({
      headTitle: this.props.headTitle,
      headDescription: this.props.headDescription,
      headKeywords: this.props.headKeywords
    })
  }

  componentWillUnmount() {
    this.props.unmountGas()
  }

  render() {
    return (
      <div>
        <FilterPanel />
        <div className="row">
          <div className="col-md-4 col-sm-4 col-lg-4 t-a_l col-first">
            <Panel />
          </div>
          <div className="col-md-8 col-sm-8 col-lg-8 t-a_l col-last">
            2
          </div>
        </div>
      </div>
    );
  }
}
export default connect(state => state.gasReducer, {unmountGas, setHead, getGasList})(Gas)
