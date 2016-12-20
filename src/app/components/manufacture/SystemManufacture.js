import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  searchManufactureSystem,
  setManufactureSystem,
  resetManufactureSystemSuggestions
} from './../../controllers/actions/manufactureActions'
import Autocomplete from "react-autosuggest"
import {debounce} from "lodash"
import Helper from "../../helpers"

// autosuggest
const getSuggestionValue = suggestion => suggestion.system_name
const renderSuggestion = suggestion => suggestion.system_name

class SystemManufacture extends Component {

  constructor() {
    super()
    this.state = {
      value: ""
    }
    this.debounceGetSuggestions = debounce(this.loadSuggestions, Helper.cfg.debounceTimeout)
  }

  loadSuggestions(value) {
    this.props.searchManufactureSystem(Helper.escapeRegexCharacters(value));
  }

  onSuggestionSelected = (event, {suggestion}) => {
    this.props.setManufactureSystem(suggestion)
  };
  onSuggestionsFetchRequested = value => {
    if (Helper.AutocompleteMinCharacters(value.value)) {
      this.debounceGetSuggestions(value.value)
    }
  };
  onSuggestionsClearRequested = () => {
    this.props.resetManufactureSystemSuggestions();
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

    return <Autocomplete
      suggestions={this.props.sm_sugg}
      onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
      onSuggestionsClearRequested={this.onSuggestionsClearRequested}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      onSuggestionSelected={this.onSuggestionSelected}
      inputProps={inputProps}
    />
  }
}

function mapStateToProps(state) {
  return state.manufactureReducers
}
export default connect(mapStateToProps, {
  searchManufactureSystem,
  setManufactureSystem,
  resetManufactureSystemSuggestions
})(SystemManufacture)
