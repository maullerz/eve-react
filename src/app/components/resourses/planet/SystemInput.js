import React  from 'react'
import {connect} from 'react-redux'
import {
  searchInputSystem,
  setInputSystem,
  resetInputSugg
} from './../../../actions/planetActions'
import Autocomplete from "react-autosuggest"
import {debounce} from "lodash"
import Helper from "../../../helpers"

// autosuggest
const getSuggestionValue = suggestion => suggestion.system_name
const renderSuggestion = suggestion => suggestion.system_name

class SystemInput extends React.Component {

  constructor() {
    super()
    this.state = {
      value: "Jita"
    }
    this.debounceGetSuggestions = debounce(this.loadSuggestions, Helper.const.debounceTimeout)
  }

  loadSuggestions(value) {
    this.props.searchInputSystem(Helper.escapeRegexCharacters(value));
  }

  onSuggestionSelected = (event, {suggestion}) => {
    this.props.setInputSystem(suggestion)
  };
  onSuggestionsFetchRequested = value => {
    if (Helper.AutocompleteMinCharacters(value.value)) {
      this.debounceGetSuggestions(value.value)
    }
  };
  onSuggestionsClearRequested = () => {
    this.props.resetInputSugg()
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

    return (<div className="inline-block-search">
      <Autocomplete
        suggestions={this.props.input_sugg}
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

export default connect(state => state.planetReducer, {
  searchInputSystem,
  setInputSystem,
  resetInputSugg
})(SystemInput)
