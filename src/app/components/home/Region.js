import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  searchRegion,
  resetRegion,
  setRegion
} from '../../actions/homeActions'
import Autocomplete from "react-autosuggest"
import { debounce } from "lodash"
import Helper from "../../helpers"

// autosuggest
const getSuggestionValue = suggestion => suggestion.region_name
const renderSuggestion = suggestion => suggestion.region_name

class Region extends Component {

  constructor() {
    super()
    this.state = {
      value: "The Forge"
    }

    this.debounceGetSuggestions = debounce(this.loadSuggestions, Helper.const.debounceTimeout)
  }

  loadSuggestions(value) {
    this.props.searchRegion(Helper.escapeRegexCharacters(value));
  }

  onSuggestionSelected = (event, {suggestion}) => {
    this.props.setRegion(suggestion)
  }
  onSuggestionsFetchRequested = value => {
    if (Helper.AutocompleteMinCharacters(value.value)) {
      this.debounceGetSuggestions(value.value)
    }
  }
  onSuggestionsClearRequested = () => {
    this.props.resetRegion()
  };
  onChange = (event, {newValue}) => {
    this.setState({
      value: newValue
    });
  };

  render() {

    const {value} = this.state
    const inputProps = {
      placeholder: 'Region name',
      value,
      className: "w100",
      onChange: this.onChange
    }

    return (
      <div className="inline-block-search w100">
        <Autocomplete
          suggestions={this.props.region_sugg}
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
  return state.homeReducer
}
export default connect(mapStateToProps, {
  searchRegion,
  setRegion,
  resetRegion
})(Region)
