import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  resetSystemItemSuggestions,
  searchItemSystem,
  setItemSystem
} from './../../controllers/actions/manufactureActions'
import Autocomplete from "react-autosuggest"

// autosuggest
const getSuggestionValue = suggestion => suggestion.system_name
const renderSuggestion = suggestion => suggestion.system_name

class SystemItem extends Component {

  constructor() {
    super()
    this.state = {
      value: "Jita"
    }
  }

  onSuggestionSelected = (event, {suggestion}) => {
    this.props.setItemSystem(suggestion, this.props)
  };
  onSuggestionsFetchRequested = value => {
    if (value.value.length >= 2) {
      this.props.searchItemSystem(value.value)
    }
  };
  onSuggestionsClearRequested = () => {
    this.props.resetSystemItemSuggestions()
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
          suggestions={this.props.pis_sugg}
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
  return state.manufactureReducers
}
export default connect(mapStateToProps, {
  searchItemSystem,
  setItemSystem,
  resetSystemItemSuggestions
})(SystemItem)
