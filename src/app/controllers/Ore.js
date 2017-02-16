import React from 'react'
//import OneColumnTable from '../components/blocks/_one_column_table'
import { connect } from 'react-redux'
import { unmountOre } from "../actions/oreActions"
import { setHead } from "../actions/appActions"

class Ore extends React.Component {

  componentDidMount() {
    this.props.setHead({
      headTitle: this.props.headTitle,
      headDescription: this.props.headDescription,
      headKeywords: this.props.headKeywords
    })
  }

  componentWillUnmount() {
    this.props.unmountOre()
  }

  render() {
    
    return (
      <div>
        <div className='row'>
          <div className='col-md-12 t-a_l'>

          </div>
        </div>
      </div>
    )
  }
}
export default connect(state => state.oreReducer, { unmountOre, setHead })(Ore)
