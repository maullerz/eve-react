import React from 'react'
import {connect} from 'react-redux'
import {unmountPlanet, getScheme, updFalse, updPrice, recalculate} from '../actions/planetActions'
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
    if (np._need_upd_iprices) {
      let inputComponent = map(np.materials, 'item_id')
      this.props.updPrice(np.input_system_id, inputComponent)
      this.props.updFalse('_need_upd_iprices')
    }
    if (np._need_upd_oprices) {
      this.props.updPrice(np.output_system_id, [np.scheme.typeID])
      this.props.updFalse('_need_upd_oprices')
    }
    if (!np._need_upd_iprices && !np._need_upd_oprices && np._need_recalculate) {
      this.props.recalculate()
    }
    if (np._need_update_headers) {
      this.props.updFalse('_need_update_headers')
      this.props.setHead({
        headTitle: np.scheme.schema_name,
        headDescription: np.scheme.schema_name + " planet resourse schema",
        headKeywords: np.scheme.schema_name + ", eve online, planet resourses"
      })
    }
  }

  componentDidMount() {
    if (this.props.params.url) {
      this.props.getScheme(this.props.params.url)
    }
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
export default connect(state => state.planetReducer, {
  unmountPlanet,
  setHead,
  getScheme,
  updFalse,
  updPrice,
  recalculate
})(Planet)
