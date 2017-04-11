import React from 'react';
import { connect } from 'react-redux';
import { updateVars, searchOutputSystem } from '../../../actions/gasActions';

// components
import SystemSellBuy from './../../blocks/SystemSellBuy';

class Panel extends React.Component {

  // Get suggestions
  getSuggestionsOutputSystem(term) {
    this.props.searchOutputSystem(term);
  }

  // Reset suggestions
  resetSuggestionsOutputSystem() {
    this.props.updateVars({suggestions: []});
  }

  setOutputSystem(system_id, system_name) {
    this.props.updateVars({
      system_name: system_name,
      system_id: system_id,
      _need_upd_prices: true
    });
  }

  changePriceTypeOutput(typePrice) {
    this.props.updateVars({ price_type: typePrice });
  }

  chLT(type) {
    this.props.updateVars({ list_type: type });
  }


  render() {
    let colLeft = 'col-md-4';
    let colRight = 'col-md-8';
    let { suggestions, list_type, price_type } = this.props;

    return (
      <div className="row">
        <div className="col-md-12">
          <table className="inside">
            <thead>
              <tr>
                <th colSpan="2">Panel</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="2" className="inside-table">
                  <div className="row">
                    <div className={colLeft}>System</div>
                    <div className={colRight}>
                      <SystemSellBuy
                        suggestions={suggestions}
                        setSystem={this.setOutputSystem.bind(this)}
                        getSuggestions={this.getSuggestionsOutputSystem.bind(this)}
                        resetSuggestions={this.resetSuggestionsOutputSystem.bind(this)}
                        typePrice={price_type}
                        setTypePrice={this.changePriceTypeOutput.bind(this)}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className={colLeft}>List type</div>
                    <div className={colRight}>
                      <div className="btn-group">
                        <button onClick={this.chLT.bind(this, 'full')} className={list_type === 'full' ? 'active' : ''}>
                          full
                        </button>
                        <button
                          onClick={this.chLT.bind(this, 'short')}
                          className={list_type === 'short' ? 'active' : ''}
                        >
                          short
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className={colLeft}>Profit</div>
                    <div className={colRight}>
                      Colorized values (red or green)
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default connect(state => state.gasReducer, { updateVars, searchOutputSystem })(Panel);
