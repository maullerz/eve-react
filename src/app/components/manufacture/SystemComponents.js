import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  searchComponentsSystem,
  resetSystemComponentsSuggestions,
  setComponentsSystem
} from './../../controllers/actions/manufactureActions'
import Autocomplete from "react-autosuggest"
import {debounce} from "lodash"
import Helper from "../../helpers"

// autosuggest
const getSuggestionValue = suggestion => suggestion.system_name
const renderSuggestion = suggestion => suggestion.system_name

class SystemComponents extends Component {

  constructor() {
    super()
    this.state = {
      value: "Jita"
    }
    this.debounceGetSuggestions = debounce(this.loadSuggestions, Helper.cfg.debounceTimeout)
  }

  loadSuggestions(value) {
    this.props.searchComponentsSystem(Helper.escapeRegexCharacters(value));
  }

  onSuggestionSelected = (event, {suggestion}) => {
    this.props.setComponentsSystem(suggestion.system_id, this.props)
  };
  onSuggestionsFetchRequested = value => {
    if (Helper.AutocompleteMinCharacters(value.value)) {
      this.debounceGetSuggestions(value.value)
    }
  };
  onSuggestionsClearRequested = () => {
    this.props.resetSystemComponentsSuggestions();
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
          suggestions={this.props.pcs_sugg}
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
  return state.manufactureReducer
}
export default connect(mapStateToProps, {
  searchComponentsSystem,
  resetSystemComponentsSuggestions,
  setComponentsSystem
})(SystemComponents)
