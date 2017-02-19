import React from 'react'
import {connect} from 'react-redux'
import {forEach} from 'lodash'
import {browserHistory} from "react-router"
import {getSchemes} from './../../../actions/planetActions'
// components
import OneTable from './../planet/OneTable'

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
      <OneTable _class='col-md-3 col-first'
                lh={this.lh.bind(this)}
                hr={this.hr.bind(this)}
                title={this.props.titles[1334]}
                data={this.props.schemes[1334]}/>
      <OneTable _class='col-md-3 col-midd'
                lh={this.lh.bind(this)}
                hr={this.hr.bind(this)}
                title={this.props.titles[1335]}
                data={this.props.schemes[1335]}/>
      <OneTable _class='col-md-3 col-midd'
                lh={this.lh.bind(this)}
                hr={this.hr.bind(this)}
                title={this.props.titles[1336]}
                data={this.props.schemes[1336]}/>
      <OneTable _class='col-md-3 col-last'
                lh={this.lh.bind(this)}
                hr={this.hr.bind(this)}
                title={this.props.titles[1337]}
                data={this.props.schemes[1337]}/>
    </div>
  }

  // lock Highlight
  lh(url) {
    this.isLock = !this.isLock
    if (this.isLock) {
      browserHistory.push('/planet/scheme/' + url)
    }
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

export default connect(state => state.planetReducer, {getSchemes})(Tables)
