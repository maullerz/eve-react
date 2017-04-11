import React from 'react'
import {connect} from 'react-redux'
import {map} from 'lodash'
import {unmountGas, getGasList, getPrices,updateVars} from "../actions/gasActions"
import {setHead} from "../actions/appActions"
import FilterPanel from '../components/resourses/gas/FilterPanel'
import Panel from '../components/resourses/gas/Panel'
import SheetItems from '../components/resourses/gas/SheetItems'

class Gas extends React.Component {

  componentDidMount() {
    this.props.getGasList()
  }

  componentWillReceiveProps(np) {
    if (np._need_upd_prices) {
      this.props.getPrices(np.system_id, map(np.gas_list, 'item_id').join(","))
      this.props.updateVars({_need_upd_prices: false})
    }
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
            <SheetItems title="Gases"/>
          </div>
        </div>
      </div>
    );
  }
}
export default connect(state => state.gasReducer, {unmountGas, setHead, getGasList, getPrices,updateVars})(Gas)
