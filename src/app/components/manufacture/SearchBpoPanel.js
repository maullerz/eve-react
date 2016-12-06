import React, {Component} from 'react'
import Autosuggest from 'react-autosuggest'
import {connect} from 'react-redux'
import {searchBpo, getBlueprint} from '../../controllers/actions/manufactureActions'

const getSuggestionValue = suggestion => suggestion.blueprint_name
const renderSuggestion = suggestion => suggestion.blueprint_name

class SearchBpoPanel extends Component {

  constructor() {
    super()
    this.state = {
      value: ""
    }
  }

  onSuggestionSelected = (event, {suggestion}) => {
    this.props.getBlueprint(suggestion.url)
  };

  // Api Call to fetch items
  onSuggestionsFetchRequested = value => {
    this.props.searchBpo(value.value);
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  onChange = (event, {newValue}) => {

    this.setState({
      value: newValue
    });
  };

  render() {

    const {value} = this.state;

    const inputProps = {
      placeholder: 'Search blueprint',
      value,
      className: "input-search",
      onChange: this.onChange
    };

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="panel-content">
            <h1>Manufacture Calculator {this.props.bpc_title}</h1>

            <div id="autocomplete">
              <Autosuggest
                suggestions={this.props.suggestions}
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
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    suggestions: state.manufactureReducers.suggestions || [],
    bpc: state.manufactureReducers.bpc || "",
    bpc_title: state.manufactureReducers.bpc_title
  }
}
export default connect(mapStateToProps, {searchBpo, getBlueprint})(SearchBpoPanel);
