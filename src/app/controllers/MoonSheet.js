import React from 'react'
import {connect} from 'react-redux'
import {unmountMoonSheet, getSheet} from '../actions/moonsheetActions'
import {setHead} from '../actions/appActions'

// components
import Panel from './../components/resourses/moonsheet/Panel'
import SheetItems from './../components/resourses/moonsheet/SheetItems'

class MoonSheet extends React.Component {

  componentDidMount() {
    let {headTitle, headDescription, headKeywords, setHead, getSheet} = this.props
    setHead({
      headTitle: headTitle,
      headDescription: headDescription,
      headKeywords: headKeywords
    })
    getSheet()
  }

  componentWillUnmount() {
    this.props.unmountMoonSheet()
  }

  render() {

    return (
      <div className='row'>
        <div className='col-md-4 t-a_l col-first'>
          <Panel />
        </div>
        <div className='col-md-4 t-a_l col-midd'>
          <SheetItems title="Moon materials" />
        </div>
        <div className='col-md-4 t-a_l col-last'>
          dasdwqdw
        </div>
      </div>
    )
  }
}

export default connect(state => state.moonSheetReducer, {
  unmountMoonSheet,
  setHead,
  getSheet
})(MoonSheet)
