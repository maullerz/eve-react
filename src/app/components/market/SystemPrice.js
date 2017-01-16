import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  searchSystem,
  resetSystem,
  setSystem
} from '../../actions/marketActions'
import Autocomplete from "react-autosuggest"
import { debounce } from "lodash"
import Helper from "../../helpers"

// autosuggest
const getSuggestionValue = suggestion => suggestion.system_name
const renderSuggestion = suggestion => suggestion.system_name

class SystemPrice extends Component {

  constructor() {
    super()
    this.state = {
      value: "Jita"
    }
    this.debounceGetSuggestions = debounce(this.loadSuggestions, Helper.const.debounceTimeout)
  }

  loadSuggestions(value) {
    this.props.searchSystem(Helper.escapeRegexCharacters(value));
  }

  onSuggestionSelected = (event, {suggestion}) => {
    this.props.setSystem(suggestion.system_id)
  };
  onSuggestionsFetchRequested = value => {
    if (Helper.AutocompleteMinCharacters(value.value)) {
      this.debounceGetSuggestions(value.value)
    }
  };
  onSuggestionsClearRequested = () => {
    this.props.resetSystem();
  };
  onChange = (event, {newValue}) => {
    this.setState({
      value: newValue
    });
  };

  render() {

    const {value} = this.state
    const inputProps = {
      placeholder: 'System name',
      value,
      className: "w130px",
      onChange: this.onChange
    }

    return (
      <div className="inline-block-search">
        <Autocomplete
          suggestions={this.props.s_sugg}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          onSuggestionSelected={this.onSuggestionSelected}
          inputProps={inputProps}
          />
      </div>)
  }
}

function mapStateToProps(state) {
  return state.marketReducer
}
export default connect(mapStateToProps, {
  searchSystem,
  setSystem,
  resetSystem
})(SystemPrice)
