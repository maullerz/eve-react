import React from 'react'
import {connect} from 'react-redux'
import {unmountPlanet, getScheme, updFalse, updPrice} from '../actions/planetActions'
import {setHead} from '../actions/appActions'
import {map} from 'lodash'

// components
import TableResourses from './../components/resourses/planet/Tables'
import Calculator from './../components/resourses/planet/Calculator'
import Components from './../components/resourses/planet/Components'

class Planet extends React.Component {

  componentWillReceiveProps(np) {
    if (np.params.url !== this.props.params.url) {
      this.props.getScheme(np.params.url)
    }
    if (this.props._need_upd_iprices) {
      let inputComponent = map(this.props.materials, 'item_id')
      this.props.updPrice(this.props.input_system_id, inputComponent)
      this.props.updFalse('_need_upd_iprices')
    }
    if (this.props._need_upd_oprices) {
      this.props.updFalse('_need_upd_oprices')
      this.props.updPrice(this.props.output_system_id, [this.props.scheme.typeID])

    }
  }

  componentDidMount() {
    if (this.props.params.url) {
      this.props.getScheme(this.props.params.url)
    }
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
          <div className='col-md-6 t-a_l col-first'>
            <Calculator />
          </div>
          <div className='col-md-6 t-a_l col-last'>
            <Components />
          </div>
        </div>
        <div className='row'>
          <div className='col-md-12 t-a_l'>
            <TableResourses />
          </div>
        </div>
      </div>
    )
  }
}
export default connect(state => state.planetReducer, {unmountPlanet, setHead, getScheme, updFalse, updPrice})(Planet)
