import React, {Component} from 'react'
import {connect} from 'react-redux'
import {map} from 'lodash'
import {updNeed, getChartData, unmountHome, getFacebookFeed} from '../actions/homeActions'

import Copyright from '../components/blocks/_copyright'
import PanelContent from '../components/blocks/_panel_content'
import IndexTables from '../components/blocks/_index_tables'
import Region from '../components/home/Region'
import SearchItem from '../components/home/Item'
import FacebookWidget from '../components/FacebookWidget'
import SimpleList from '../components/SimpleList'
import FBFeedLine from '../components/home/FBFeedLine'
import HighChart from '../components/HomeChart'

class Home extends Component {

  constructor (props) {
    super(props)
    this.props.getChartData(props.region_id, props.item_id)
    this.props.getFacebookFeed()
    this.state = {
      tableData: [
        {
          title: 'Market',
          list: [
            'Actual Prices (Eve-Central)',
            'Prices Review Of One Item In Different Market Hubs',
            'Buying And Selling Price Margin‎ In Different Systems',
            'Search Of Fast And Slow Auctions',
            'Dynamic Pricing Review',
            'Orders Review In Real Time'
          ]
        },
        {
          title: 'Production',
          list: [
            'Actual Item Base',
            'Changing Of Material Quantity Required For Production In Manual Mode',
            'Drafting Settings Specifying',
            'Additional Expenditures Specifying',
            'Profit Сalculation From Production In Real Time',
            'Unlimited Item Lists'
          ]
        },
        {
          title: 'More',
          list: [
            'Table Ore/Ice Processing',
            'Minerals Exchange And Trade',
            'Moon resources',
            'Planet resources'
          ]
        }
      ]
    }
  }

  componentWillReceiveProps (np) {
    if (+np.item_id !== +this.props.item_id || +np.region_id !== +this.props.region_id) {
      this.props.getChartData(np.region_id, np.item_id)
      this.props.updNeed('_need_update_chart', false)
    }
  }

  componentWillUnmount () {
    this.props.unmountHome()
  }

  render () {
    let facebookFeed = map(this.props.facebook_feed, v => {
      return <FBFeedLine created_at={v.created_at} message={v.message} />
    })

    return (
      <div>
        <IndexTables listTables={this.state.tableData} />
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

export default connect(state => state.homeReducer, {updNeed, getChartData, unmountHome, getFacebookFeed})(Home)
