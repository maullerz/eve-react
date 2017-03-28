import React from 'react';
import { connect } from 'react-redux';
import { updateVars, searchOutputSystem, searchInputSystem } from '../../../actions/planetSheetActions';

// components
import SystemSellBuy from './../../blocks/SystemSellBuy';

class Panel extends React.Component {

  // Get suggestions
  getSuggestionsOutputSystem(term) {
    this.props.searchOutputSystem(term);
  }
  getSuggestionsInputSystem(term) {
    this.props.searchInputSystem(term);
  }

  // Reset suggestions
  resetSuggestionsOutputSystem() {
    this.props.updateVars({suggestions_output: []});
  }
  resetSuggestionsInputSystem() {
    this.props.updateVars({suggestions_input: []});
  }

  setOutputSystem(system_id, system_name) {
    this.props.updateVars({
      _need_upd_price_output: true,
      output_system: system_name,
      output_system_id: system_id,
    });
  }
  setInputSystem(system_id, system_name) {
    this.props.updateVars({
      _need_upd_price_input: true,
      input_system: system_name,
      input_system_id: system_id
    });
  }

  changePriceTypeInput(typePrice) {
    this.props.updateVars({ price_input_type: typePrice });
  }

  changePriceTypeOutput(typePrice) {
    this.props.updateVars({ price_output_type: typePrice });
  }

  chLT(type) {
    this.props.updateVars({ list_type: type });
  }

  render() {
    let colLeft = 'col-md-4';
    let colRight = 'col-md-8';
    let { price_input_type, price_output_type, suggestions_output, suggestions_input, list_type } = this.props;

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
                    <div className={colLeft}>Input materials</div>
                    <div className={colRight}>
                      <SystemSellBuy
                        suggestions={suggestions_input}
                        setSystem={this.setInputSystem.bind(this)}
                        getSuggestions={this.getSuggestionsInputSystem.bind(this)}
                        resetSuggestions={this.resetSuggestionsInputSystem.bind(this)}
                        typePrice={price_input_type}
                        setTypePrice={this.changePriceTypeInput.bind(this)}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className={colLeft}>Output materials</div>
                    <div className={colRight}>
                      <SystemSellBuy
                        suggestions={suggestions_output}
                        setSystem={this.setOutputSystem.bind(this)}
                        getSuggestions={this.getSuggestionsOutputSystem.bind(this)}
                        resetSuggestions={this.resetSuggestionsOutputSystem.bind(this)}
                        typePrice={price_output_type}
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

export default connect(state => state.planetSheetReducer, { updateVars, searchOutputSystem, searchInputSystem })(Panel);
