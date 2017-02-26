import React from 'react'
import {connect} from 'react-redux'
import {forEach} from 'lodash'
import {browserHistory} from "react-router"
import {getSchemes} from './../../../actions/moonActions'
// components
import OneTable from './../moon/OneTable'

class Tables extends React.Component {

  constructor(props) {
    super(props)
    this.isLock = false
  }

  componentDidMount() {
    this.props.getSchemes()
  }

  render() {
    return <div className='row'>
      <OneTable _class='col-md-4 col-first'
                link={false}
                lh={this.lh.bind(this)}
                hr={this.hr.bind(this)}
                title={this.props.titles[501]}
                data={this.props.schemes[501]}/>
      <OneTable _class='col-md-4 col-midd'
                link={true}
                lh={this.lh.bind(this)}
                hr={this.hr.bind(this)}
                title={this.props.titles[500]}
                data={this.props.schemes[500]}/>
      <OneTable _class='col-md-4 col-midd'
                link={true}
                lh={this.lh.bind(this)}
                hr={this.hr.bind(this)}
                title={this.props.titles[499]}
                data={this.props.schemes[499]}/>
    </div>
  }

  // lock Highlight
  lh(itemId, url) {
    browserHistory.push('/moon/scheme/' + url)
    this.isLock = !this.isLock
  }

  // Highlight Relations
  hr(itemId) {
    if (!this.isLock) {
      let li = window.document.querySelectorAll("li.pea")
      // hightlight relations
      forEach(li, v => {
        v.classList.remove('active')
        let dp = v.getAttribute('data-parent')
        let dc = v.getAttribute('data-childs')
        if (dc.indexOf('-' + itemId + '-') !== -1) {
          v.classList.add('active')
        }
        if (dp.toString() === itemId.toString()) {
          v.classList.add('active')
        }
      })
    }
  }
}
export default connect(state => state.moonReducer, {getSchemes})(Tables)
