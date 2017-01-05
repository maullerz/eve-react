import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  searchItem,
  resetItem,
  setItem
} from '../../controllers/actions/homeActions'
import Autocomplete from "react-autosuggest"
import {debounce} from "lodash"
import Helper from "../../helpers"

// autosuggest
const getSuggestionValue = suggestion => suggestion.item_name
const renderSuggestion = suggestion => suggestion.item_name

class Item extends Component {

  constructor() {
    super()
    this.state = {
      value: "30 Day Pilot's License Extension (PLEX)"
    }

    this.debounceGetSuggestions = debounce(this.loadSuggestions, Helper.cfg.debounceTimeout)
  }

  loadSuggestions(value) {
    this.props.searchItem(Helper.escapeRegexCharacters(value));
  }

  onSuggestionSelected = (event, {suggestion}) => {
    this.props.setItem(suggestion)
  }
  onSuggestionsFetchRequested = value => {
    if (Helper.AutocompleteMinCharacters(value.value)) {
      this.debounceGetSuggestions(value.value)
    }
  };
  onSuggestionsClearRequested = () => {
    this.props.resetItem()
  };
  onChange = (event, {newValue}) => {
    this.setState({
      value: newValue
    });
  };

  render() {

    const {value} = this.state
    const inputProps = {
      placeholder: 'Item name',
      value,
      className: "w100",
      onChange: this.onChange
    }
    return (
      <div className="inline-block-search w100">
        <Autocomplete
          suggestions={this.props.item_sugg || []}
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

export default connect(state => state.homeReducer, {
  searchItem,
  setItem,
  resetItem
})(Item)
