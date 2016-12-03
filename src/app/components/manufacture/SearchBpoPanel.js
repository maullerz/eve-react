import React, {Component} from "react"
import Autosuggest from "react-autosuggest"
import Api from "./../../api"

const getSuggestionValue = suggestion => suggestion.blueprint_name
const renderSuggestion = suggestion => suggestion.blueprint_name

const onSuggestionSelected = (event, {suggestion, suggestionValue, sectionIndex, method}) => {
  console.log(suggestion.blueprint_name);
}

export default class SearchBpoPanel extends Component {

  constructor() {
    super()
    this.state = {
      value      : "",
      suggestions: []
    }
  }

  onChange = (event, {newValue}) => {
    this.setState({
      value: newValue
    });
  };

  // Api Call to fetch items
  onSuggestionsFetchRequested = value => {

    if (value.value.length > 2) {

      Api.Manufacture.searchBpc(value.value)
        .then(json => {
          this.setState({
            suggestions: json.data.items
          });
        })
        .catch();
    }
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {

    const {value, suggestions} = this.state;

    const inputProps = {
      placeholder: 'Search blueprint',
      value,
      className  : "input-search",
      onChange   : this.onChange
    };

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="panel-content">
            <h1>Manufacture Calculator</h1>
            <div id="autocomplete">
              <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                onSuggestionSelected={onSuggestionSelected}
                inputProps={inputProps}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
