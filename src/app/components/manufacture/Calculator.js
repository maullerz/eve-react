import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helper from '../../helpers';
import SystemManufacture from '../manufacture/SystemManufacture';
import SystemComponents from '../manufacture/SystemComponents';
import SystemItem from '../manufacture/SystemItem';
import { map } from 'lodash';
import {
  changeMe,
  changeRun,
  changeTe,
  changeBpcCost,
  recalculateManufacture,
  changePriceTypeItem,
  changePriceTypeComponents,
  setComponentsSystem,
  setItemSystem,
  getFacilities,
  setFacilityVal,
  updateVariable
} from '../../actions/manufactureActions';

class Calculator extends Component {
  constructor() {
    super();
    this.state = {
      findex: 0
    };
  }
  componentWillReceiveProps(np) {
    let { _need_update_prices_item, _need_update_prices_components, _need_recalculate } = np;
    let { setItemSystem, setComponentsSystem, recalculateManufacture, pisystem_id, pcsystem_id } = this.props;

    if (_need_update_prices_item) {
      setItemSystem(pisystem_id, np);
    }
    if (_need_update_prices_components) {
      setComponentsSystem(pcsystem_id, np);
    }
    if (_need_recalculate) {
      recalculateManufacture(np);
    }
  }

  changePriceTypeItem(type) {
    this.props.changePriceTypeItem(type);
  }

  changePriceTypeComponents(type) {
    this.props.changePriceTypeComponents(type);
  }

  changeBpcCost(event) {
    this.props.changeBpcCost(event.target.value);
  }

  changeRun(event) {
    this.props.changeRun(event.target.value);
  }

  changeMe(event) {
    this.props.changeMe(event.target.value);
  }

  changeFacility(event) {
    let index = event.target.value;
    let { type_structure, structures, setFacilityVal, updateVariable } = this.props;
    let { me, te } = structures[type_structure][index];
    setFacilityVal(me, te);
    updateVariable('_need_recalculate', true);
    this.setState({ findex: index });
  }

  changeTe(event) {
    this.props.changeTe(event.target.value);
  }

  changeStructure(type) {
    let { structures, updateVariable, setFacilityVal } = this.props;
    let { me, te } = structures[type][0];
    updateVariable('type_structure', type);
    setFacilityVal(me, te);
    this.setState({ findex: 0 });
  }

  render() {
    let col = {
      left: 'col-md-4',
      right: 'col-md-8'
    };

    let { structures, types_structure, type_structure } = this.props;

    let ts = map(types_structure, (v, i) => {
      return (
        <button key={i} onClick={this.changeStructure.bind(this, v)} className={type_structure === v ? 'active' : ''}>
          {v}
        </button>
      );
    });

    let calculator = (
      <div className="row">
        <div className="col-md-12">
          <table className="inside">
            <thead>
              <tr>
                <th colSpan="2">Calculator</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="2" className="inside-table">
                  <div className="row">
                    <div className={col.left}>
                      Facility Type
                    </div>
                    <div className={col.right}>
                      <div className="btn-group">
                        {ts}
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className={col.left} />
                    <div className={col.right}>
                      <select className="w100" value={this.state.findex} onChange={this.changeFacility.bind(this)}>
                        {structures[type_structure].map((val, index) => {
                          return <option key={index} value={index}>{val.item_name}</option>;
                        })}
                      </select>
                    </div>
                  </div>
                  <div className="row">
                    <div className={col.left}>ME / TE</div>
                    <div className={col.right}>
                      <select value={this.props.me} onChange={this.changeMe.bind(this)}>
                        {[10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0].map(val => {
                          return <option key={val} value={val}>ME {val}</option>;
                        })}
                      </select>
                      <select value={this.props.te} onChange={this.changeTe.bind(this)}>
                        {[10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0].map(val => {
                          return <option key={val} value={val}>TE {val}</option>;
                        })}
                      </select> {this.props.timeRun}
                    </div>
                  </div>
                  <div className="row">
                    <div className={col.left}>Run / Output items</div>
                    <div className={col.right}>
                      <input onChange={this.changeRun.bind(this)} value={this.props.run} /> x {this.props.output}
                    </div>
                  </div>
                  <div className="row">
                    <div className={col.left}>Cost components, isk</div>
                    <div className={col.right}>
                      <SystemComponents />
                      <div className="btn-group">
                        <button
                          onClick={this.changePriceTypeComponents.bind(this, 'sell')}
                          className={this.props.type_p_components === 'sell' ? 'active' : ''}
                        >
                          sell
                        </button>
                        <button
                          onClick={this.changePriceTypeComponents.bind(this, 'buy')}
                          className={this.props.type_p_components === 'buy' ? 'active' : ''}
                        >
                          buy
                        </button>
                      </div>
                      <span className="padd-left-3 txt-yellow">
                        {Helper.price(this.props.components_amount * this.props.run)}
                      </span>
                    </div>
                  </div>
                  <div className="row">
                    <div className={col.left}>Cost output item, isk</div>
                    <div className={col.right}>
                      <SystemItem />
                      <div className="btn-group">
                        <button
                          onClick={this.changePriceTypeItem.bind(this, 'sell')}
                          className={this.props.type_p_item === 'sell' ? 'active' : ''}
                        >
                          sell
                        </button>
                        <button
                          onClick={this.changePriceTypeItem.bind(this, 'buy')}
                          className={this.props.type_p_item === 'buy' ? 'active' : ''}
                        >
                          buy
                        </button>
                      </div>
                      <span className="padd-left-3 txt-yellow">{Helper.price(this.props.item_amount)}</span>
                    </div>
                  </div>
                  <div className="row">
                    <div className={col.left}>BPC cost</div>
                    <div className={col.right}>
                      <input onChange={this.changeBpcCost.bind(this)} value={this.props.bpc_cost} />
                    </div>
                  </div>
                  <div className="row">
                    <div className={col.left}>System manufacture</div>
                    <div className={col.right}>
                      <div className="inline-block-search">
                        <SystemManufacture />
                      </div>
                      <span>
                        &nbsp;
                        {Helper.price(this.props.adjustCost)}
                        {' '}
                        &nbsp;(
                        {Helper.price((+this.props.costIndex) * 100)}
                        %)
                      </span>
                    </div>
                  </div>
                  <div className="row">
                    <div className={col.left}>Total, isk</div>
                    <div className={col.right}>{Helper.price(this.props.total)}</div>
                  </div>
                  <div className="row">
                    <div className={col.left}>Profit, isk</div>
                    <div className={col.right}>
                      <span className={this.props.profit >= 0 ? 'txt-yellow' : 'profit-minus'}>
                        {Helper.price(this.props.profit)}
                      </span>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );

    return this.props.bpc_title ? calculator : null;
  }
}

function mapStateToProps(state) {
  return state.manufactureReducer;
}
export default connect(mapStateToProps, {
  changeMe,
  changeRun,
  changeTe,
  recalculateManufacture,
  changeBpcCost,
  changePriceTypeItem,
  changePriceTypeComponents,
  setComponentsSystem,
  setItemSystem,
  getFacilities,
  setFacilityVal,
  updateVariable
})(Calculator);
