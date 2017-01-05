import React, {Component} from 'react'
import OneColumnTable from '../components/OneColumnTable'
import UsersList from '../components/UsersList'
import Api from '../api'
import {forEach} from 'lodash'

class Donate extends Component {

  constructor (props) {
    super(props)

    this.state = {
      authors: {
        title: 'If you wish to support the project - just donate some ISK on game characters',
        list: []
      },
      contribute: {
        title: 'Players who have contributed to the project development',
        list: []
      },
      donators: {
        title: 'Players who have donated to the project',
        list: []
      }
    }
  }

  componentDidMount () {
    Api.Donate.donate().then(response => {
      let authors = []

      forEach(response.data.authors, function (val, index) {
        authors.push({
          char_id: index,
          char_name: val.name,
          description: val.about
        })
      })

      let prevState = this.state

      prevState.contribute.list = response.data.left.map(function (val, index) {
        return <UsersList key={index} char={val} />
      })

      prevState.donators.list = response.data.right.map(function (val, index) {
        return <UsersList key={index} char={val} />
      })

      prevState.authors.list = authors.map(function (val, index) {
        return <UsersList key={index} char={val} />
      })

      this.setState({prevState})
    })
      .catch()
  }

  render () {
    return (
      <div>
        <div className='row'>
          <div className='col-md-12 t-a_l'>
            <OneColumnTable _class='td-padd-rb' title={this.state.authors.title} list={this.state.authors.list} />
          </div>
        </div>
        <div className='row'>
          <div className='col-md-4 t-a_l col-first'>
            <OneColumnTable _class='td-padd-rb' title={this.state.contribute.title} list={this.state.contribute.list} />
          </div>
          <div className='col-md-8 t-a_l col-last'>
            <OneColumnTable _class='td-padd-rb' title={this.state.donators.title} list={this.state.donators.list} />
          </div>
        </div>
      </div>
    )
  }
}
export default Donate
