import React from 'react'
import { connect } from 'react-redux'
import { map } from 'lodash'
import { updNeed, getChartData, unmountHome, getFacebookFeed } from '../actions/homeActions'
import { setHead } from '../actions/appActions'

import Copyright from '../components/blocks/_copyright'
import PanelContent from '../components/blocks/_panel_content'
import IndexTables from '../components/blocks/_index_tables'
import Region from '../components/home/Region'
import SearchItem from '../components/home/Item'
import FacebookWidget from '../components/blocks/_facebook_widget'
import SimpleList from '../components/blocks/_simple_list'
import FBFeedLine from '../components/home/FBFeedLine'
import HighChart from '../components/blocks/_home_chart'

class Home extends React.Component {

  componentWillReceiveProps(np) {
    if (+np.item_id !== +this.props.item_id || +np.region_id !== +this.props.region_id) {
      this.props.getChartData(np.region_id, np.item_id)
      this.props.updNeed('_need_update_chart', false)
    }
  }

  componentWillMount() {
    this.props.getChartData(this.props.region_id, this.props.item_id)
    this.props.getFacebookFeed()
    this.props.setHead({
      headTitle: this.props.headTitle,
      headDescription: this.props.headDescription,
      headKeywords: this.props.headKeywords
    })
  }

  componentWillUnmount() {
    this.props.unmountHome()
  }

  render() {
    let facebookFeed = map(this.props.facebook_feed, v => {
      return <FBFeedLine created_at={v.created_at} message={v.message} />
    })

    return (
      <div>
        <IndexTables listTables={this.props.tableData} />
        <PanelContent title='Market Monitoring' />
        <div className='row'>
          <div className='col-md-8 col-first'>
            <table>
              <thead>
                <tr>
                  <th className='t-a_l'>Market</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className='padd-3'>
                    <div className='row'>
                      <div className='col-md-6 col-first'>
                        <SearchItem />
                      </div>
                      <div className='col-md-6 col-last'>
                        <Region />
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col-md-12'>
                        <HighChart container={'chartID'} />
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className='col-md-4 col-last'>
            <div className='row'>
              <div className='col-md-12'>
                <FacebookWidget _class='t-a_l' list={<SimpleList list={facebookFeed} />} />
              </div>
            </div>
          </div>
        </div>
        <Copyright />
      </div>
    )
  }
}

export default connect(state => state.homeReducer, {
  updNeed,
  getChartData,
  unmountHome,
  getFacebookFeed,
  setHead
})(Home)
