import {
  SET_REGION_SUGG,
  SET_REGION,
  RESET_REGION_SUGG,
  SET_ITEM_SUGG,
  RESET_ITEM,
  UPD_NEED,
  SET_ITEM,
  GET_CHART_DATA,
  HOME_UNMOUNT,
  FACEBOOK_FEED
} from '../actions/homeActions'

const initialState = {
  headTitle: "Manufacturing calculator and market monitoring monitoring for EVE Online",
  headDescription: "Manufacturing calculator and market monitoring for EVE Online will teach and help you to earn ISK easily and quickly!",
  headKeywords: "eve online, eve market, market monitoring, manufacture calculator",
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
  ],

  _need_update_chart: false,
  _need_rebuild_chart: false,
  region_id: 10000002,
  region_name: 'The Forge',
  region_sugg: [],
  item_sugg: [],
  facebook_feed: [],
  item_id: 29668,
  item_name: '30 Day Pilot\'s License Extension (PLEX)',
  chartData: []
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case GET_CHART_DATA:
    case FACEBOOK_FEED:
    case RESET_ITEM:
    case SET_REGION:
      if (+state.region_id !== +action.region_id) {
        return Object.assign({}, state, action)
      } else {
        return state
      }

    case SET_ITEM:
      if (+state.item_id !== +action.item_id) {
        return Object.assign({}, state, action)
      } else {
        return state
      }

    case SET_ITEM_SUGG:
    case SET_REGION_SUGG:
    case RESET_REGION_SUGG:
      return Object.assign({}, state, action)

    case UPD_NEED:
      let ns = {}
      ns[action._k] = action._v
      return Object.assign({}, state, ns)

    case HOME_UNMOUNT:
      return Object.assign({}, initialState)

    default:
      return state
  }
}
