import React from 'react'
import {connect} from 'react-redux'
import {unmountMoon, getScheme, updFalse, updPrice, recalculate} from '../actions/moonActions'
import {setHead} from '../actions/appActions'
import {map} from 'lodash'

// components
import TableResourses from './../components/resourses/moon/Tables'
import Calculator from './../components/resourses/moon/Calculator'
import Components from './../components/resourses/moon/Components'

class Moon extends React.Component {

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
      this.props.updPrice(np.output_system_id, [np.scheme.item_id])
      this.props.updFalse('_need_upd_oprices')
    }
    if (!np._need_upd_iprices && !np._need_upd_oprices && np._need_recalculate) {
      this.props.recalculate()
    }
    if (np._need_update_headers) {
      this.props.updFalse('_need_update_headers')
      this.props.setHead({
        headTitle: np.scheme.item_name,
        headDescription: np.scheme.item_name + " moon resourses schema",
        headKeywords: np.scheme.item_name + ", eve online, moon resourses"
      })
    }
  }

  componentDidMount() {
    if (this.props.params.url) {
      this.props.getScheme(this.props.params.url)
    }
  }

  componentWillUnmount() {
    this.props.unmountMoon()
  }

  render() {

    let calculateBlock = <div className='row'>
      <div className='col-md-6 t-a_l col-first'>
        <Calculator />
      </div>
      <div className='col-md-6 t-a_l col-last'>
        <Components />
      </div>
    </div>

    return (
      <div>
        {this.props.materials.length ? calculateBlock : null}
        <div className='row'>
          <div className='col-md-12 t-a_l'>
            <TableResourses />
          </div>
        </div>
      </div>
    )
  }
}
export default connect(state => state.moonReducer, {
  unmountMoon,
  setHead,
  getScheme,
  updFalse,
  updPrice,
  recalculate
})(Moon)
