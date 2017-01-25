import _axios from 'axios'
let baseUrl = 'https://api.eve-productions.org'
// let esiUrl = 'https://esi.tech.ccp.is'
let crestUrl = 'https://crest-tq.eveonline.com'

// actions
import { setLoaderStateObj } from "./actions/appActions"
import reducers from './../rootReducer'

import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { connect } from 'react-redux'
// import { composeWithDevTools } from 'redux-devtools-extension'

// let store = createStore(reducers, applyMiddleware(thunk))

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const axios = _axios.create({
  transformRequest: [function (data) {
    console.log("try to set true")
    store.dispatch(setLoaderStateObj(true))
    return data
  }],
  transformResponse: [function (data) {
    console.log("try to set false")
    store.dispatch(setLoaderStateObj(false))
    return JSON.parse(data)
  }],

});

const API = {

  Graph: {
    chart: function (regionId, typeID) {
      console.log(this, "this")
      return axios.get(crestUrl + '/market/' + regionId + '/history/?type=https://crest-tq.eveonline.com/inventory/types/' + typeID + '/')
    }
  },

  Search: {
    system: function (term) {
      return axios.get(baseUrl + '/search/system.json', {
        params: {
          term: term
        }
      })
    },
    region: function (term) {
      return axios.get(baseUrl + '/search/region.json', {
        params: {
          term: term
        }
      })
    },
    item: function (term) {
      return axios.get(baseUrl + '/search/item.json', {
        params: {
          term: term
        }
      })
    },
    componentByUrl: function (url) {
      return axios.get(baseUrl + '/search/component.json', {
        params: {
          url: url
        }
      })
    },
    similar: function (itemId) {
      return axios.get(baseUrl + '/search/similar.json', {
        params: {
          item_id: itemId
        }
      })
    },
    similarBpc: function (itemId) {
      return axios.get(baseUrl + '/search/similar-bpc.json', {
        params: {
          item_id: itemId
        }
      })
    },
    component: function (term) {
      return axios.get(baseUrl + '/search/component.json', {
        params: {
          term: term
        }
      })
    }
  },
  Item: {
    popularItems: function () {
      return axios.get(baseUrl + '/item/popular.json')
    },
    whereUsedComponent: function (componentId, page = 1, limit = 25) {
      return axios.get(baseUrl + '/item/bpo.json', {
        params: {
          component_id: componentId,
          page: page,
          limit: limit
        }
      })
    }
  },
  Priceall: {
    send: function (body) {
      return axios.post(baseUrl + '/priceall', {
        body: body
      })
    }
  },

  Main: {
    facebook_feed: function () {
      return axios.get(baseUrl + '/facebook_feed.json')
    },
    prices: function (systemId, items) {
      return axios.get(baseUrl + '/prices/' + systemId + '/' + items)
    },
    facilities: function (activityID) {
      return axios.get(baseUrl + '/facility.json', {
        params: {
          activityID: activityID
        }
      })
    }
  },

  Donate: {
    donate: function () {
      return axios.get(baseUrl + '/donate.json')
    }
  },

  Manufacture: {
    searchBpc: function (term) {
      return axios.get(baseUrl + '/search/bpc.json', {
        params: {
          term: term
        }
      })
    },
    getBpc: function (url) {
      return axios.get(baseUrl + '/manufacture/' + url + '.json')
    }
  }
}

export default connect(state => state.appReducer, { setLoaderStateObj })(API)
