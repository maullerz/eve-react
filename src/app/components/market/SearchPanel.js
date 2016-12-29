import React, {Component} from 'react'
import Autosuggest from 'react-autosuggest'
import {connect} from 'react-redux'
import {searchItem,addItem,resetSearch,getSimilarItems} from '../../controllers/actions/marketActions'

import {debounce} from "lodash"
import Helper from "../../helpers"

const getSuggestionValue = suggestion => suggestion.item_name
const renderSuggestion = suggestion => suggestion.item_name

class SearchPanel extends Component {

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
    this.props.getSimilarItems(suggestion.item_id)
  };

  onSuggestionsFetchRequested = value => {
    if (Helper.AutocompleteMinCharacters(value.value)) {
      this.debounceGetSuggestions(value)
    }
  };
  onSuggestionsClearRequested = () => {
    this.props.resetSearch();
    this.setState({value: ""})
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
            <h1>Market</h1>
            <Autosuggest
              suggestions={this.props.sugg}
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

function mapStateToProps(state) {
  return state.marketReducer
}
export default connect(mapStateToProps, {searchItem,addItem,resetSearch,getSimilarItems})(SearchPanel);