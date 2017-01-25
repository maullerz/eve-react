import React, { Component } from 'react'
import Header from '../components/blocks/Header'
import Loader from '../components/Loader'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'

class App extends Component {

  render() {
    console.log("loader", this.props.loader)
    return (
      <div>
        <Helmet
          title={this.props.headTitle}
          meta={[
            { name: "description", content: this.props.headDescription },
            { name: "keywords", content: this.props.headKeywords }
          ]}
          />
        <Loader isLoad={false} />
        <Header />
        {this.props.children}
      </div>)
  }
}
export default connect(state => state.appReducer, {})(App)