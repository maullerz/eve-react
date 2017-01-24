import axios from 'axios'
let baseUrl = 'https://api.eve-productions.org'
// let esiUrl = 'https://esi.tech.ccp.is'
let crestUrl = 'https://crest-tq.eveonline.com'
// actions
import { setLoaderStateObj } from "./actions/appActions"
import reducers from './../rootReducer'

import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

let store = createStore(reducers, applyMiddleware(thunk))




setTimeout(() => {
  console.log("123")
  console.log(store.getState())
}, 1000)


const _axios = axios.create({
  transformRequest: [function (data) {
    store.dispatch(setLoaderStateObj(true));
    console.log("disp")
    return data;
  }],
  transformResponse: [function (data) {
    return JSON.parse(data);
  }],

});

export default {

  Graph: {
    chart: function (regionId, typeID) {
      return _axios.get(crestUrl + '/market/' + regionId + '/history/?type=https://crest-tq.eveonline.com/inventory/types/' + typeID + '/')
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
