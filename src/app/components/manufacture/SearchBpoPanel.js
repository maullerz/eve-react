import React, { Component } from "react";
import Autosuggest from "react-autosuggest";
import { connect } from "react-redux";
import {
  searchBpc,
  getBpc,
  resetSearch
} from "../../actions/manufactureActions";
import { browserHistory } from "react-router";
import { debounce } from "lodash";
import Helper from "../../helpers";

const getSuggestionValue = suggestion => suggestion.blueprint_name;
const renderSuggestion = suggestion => suggestion.blueprint_name;

class SearchBpoPanel extends Component {
  constructor() {
    super();
    this.state = {
      value: ""
    };
    this.debounceGetSuggestions = debounce(
      this.loadSuggestions,
      Helper.const.debounceTimeout
    );
  }

  loadSuggestions(value) {
    this.props.searchBpc(Helper.escapeRegexCharacters(value.value));
  }

  onSuggestionSelected = (event, { suggestion }) => {
    this.props.getBpc(suggestion.url);
    browserHistory.push("/manufacture/" + suggestion.url);
  };
  onSuggestionsFetchRequested = value => {
    if (Helper.AutocompleteMinCharacters(value.value)) {
      this.debounceGetSuggestions(value);
    }
  };
  onSuggestionsClearRequested = () => {
    this.props.resetSearch();
    this.setState({ value: "" });
  };
  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  render() {
    const { value } = this.state;

    const inputProps = {
      placeholder: "Search blueprint here...",
      value,
      className: "input-search",
      onChange: this.onChange
    };

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="panel-content">
            <h1>{this.props.bpc.blueprint_name || "Manufacture Calculator"}</h1>
            <Autosuggest
              suggestions={this.props.suggestions}
              onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
              onSuggestionsClearRequested={this.onSuggestionsClearRequested}
              getSuggestionValue={getSuggestionValue}
              renderSuggestion={renderSuggestion}
              onSuggestionSelected={this.onSuggestionSelected}
              inputProps={inputProps}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(state => state.manufactureReducer, {
  searchBpc,
  getBpc,
  resetSearch
})(SearchBpoPanel);
