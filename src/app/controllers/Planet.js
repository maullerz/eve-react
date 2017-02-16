import React from 'react'
import { connect } from 'react-redux'
import { unmountPlanet } from "../actions/planetActions"
import { setHead } from "../actions/appActions"

// components
import TableResourses from "./../components/resourses/planet/Tables"

class Planet extends React.Component {

  componentDidMount() {
    this.props.setHead({
      headTitle: this.props.headTitle,
      headDescription: this.props.headDescription,
      headKeywords: this.props.headKeywords
    })
  }

  componentWillUnmount() {
    this.props.unmountPlanet()
  }

  render() {
    return (
      <div>
        <div className='row'>
          <div className='col-md-12 t-a_l'>
            <TableResourses />
          </div>
        </div>
      </div>
    )
  }
}
export default connect(state => state.planetReducer, { unmountPlanet, setHead })(Planet)
