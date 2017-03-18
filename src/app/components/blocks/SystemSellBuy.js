import React from "react";

import Autocomplete from "react-autosuggest";
import { debounce } from "lodash";
import Helper from "./../../helpers";

// autosuggest
const getSuggestionValue = suggestion => suggestion.system_name;
const renderSuggestion = suggestion => suggestion.system_name;

class SystemSellBuy extends React.Component {
  constructor() {
    super();
    this.state = {
      value: "Jita"
    };
    this.debounceGetSuggestions = debounce(this.loadSuggestions, Helper.const.debounceTimeout);
  }

  loadSuggestions(value) {
    this.props.getSuggestions(Helper.escapeRegexCharacters(value));
  }

  onSuggestionSelected = (event, { suggestion }) => {
    this.props.setSystem(suggestion.system_id, suggestion.system_name);
  };

  onSuggestionsFetchRequested = value => {
    if (Helper.AutocompleteMinCharacters(value.value)) {
      this.debounceGetSuggestions(value.value);
    }
  };
  onSuggestionsClearRequested = () => {
    this.props.resetSuggestions();
  };

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  // change price type
  chPT(type) {
    this.props.setTypePrice(type);
  }

  render() {
    const { value } = this.state;
    let { suggestions, typePrice } = this.props;

    let inputProps = {
      placeholder: "System name",
      value,
      className: "w130px",
      onChange: this.onChange
    };
    return (
      <div>
        <div className="inline-block-search">
          <Autocomplete
            suggestions={suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            onSuggestionSelected={this.onSuggestionSelected}
            inputProps={inputProps}
          />
        </div>
        <div className="btn-group">
          <button onClick={this.chPT.bind(this, "sell")} className={typePrice === "sell" ? "active" : ""}>
            sell
          </button>
          <button onClick={this.chPT.bind(this, "buy")} className={typePrice === "buy" ? "active" : ""}>
            buy
          </button>
        </div>
      </div>
    );
  }
}

export default SystemSellBuy;
