import React, { Component } from 'react'
import Autosuggest from 'react-autosuggest'
import { connect } from 'react-redux'
import { searchItem, addItem, resetSearch } from '../../actions/itemActions'
import { setHead } from '../../actions/appActions'
import { browserHistory } from 'react-router'

import { debounce } from "lodash"
import Helper from "../../helpers"

const getSuggestionValue = suggestion => suggestion.item_name
const renderSuggestion = suggestion => suggestion.item_name

class SearchItemPanel extends Component {

  constructor() {
    super()
    this.state = {
      value: ""
    }
    this.debounceGetSuggestions = debounce(this.loadSuggestions, Helper.cfg.debounceTimeout)
  }

  loadSuggestions(value) {
    this.props.searchItem(Helper.escapeRegexCharacters(value.value))
  }
  onSuggestionSelected = (event, {suggestion}) => {
    this.props.addItem(suggestion)
    browserHistory.push("/item/" + suggestion.url)

    this.props.setHead({
      headTitle: this.props.headTitle + ", " + suggestion.item_name,
      headDescription: this.props.headDescription,
      headKeywords: this.props.headKeywords + ", eve " + suggestion.item_name.toLowerCase()
    })
  };

  onSuggestionsFetchRequested = value => {
    if (Helper.AutocompleteMinCharacters(value.value)) {
      this.debounceGetSuggestions(value)
    }
  };
  onSuggestionsClearRequested = () => {
    this.props.resetSearch();
    this.setState({ value: "" })
  };
  onChange = (event, {newValue}) => {
    this.setState({
      value: newValue
    });
  };

  render() {

    const {value} = this.state;

    const inputProps = {
      placeholder: 'Search item here...',
      value,
      className: "input-search",
      onChange: this.onChange
    };
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="panel-content">
            <h1>Where components used?</h1>
            <Autosuggest
              suggestions={this.props.item_sugg || []}
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
    )
  }
}
export default connect(state => state.itemReducer, {
  searchItem,
  addItem,
  resetSearch,
  setHead
})(SearchItemPanel);
