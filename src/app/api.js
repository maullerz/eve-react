import axios from 'axios'
let baseUrl = 'http://api.eve-prod.xyz'
// let esiUrl = 'https://esi.tech.ccp.is'
let crestUrl = 'https://crest-tq.eveonline.com'


axios.interceptors.request.use(function (config) {
  document.getElementById("ajax_loader").style = 'display:flex'
  return config;
}, function (error) {
  return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  setTimeout(() => {
    document.getElementById("ajax_loader").style = 'display:none'
  }, 250)
  return response;
}, function (error) {
  return Promise.reject(error);
});

export default {
  Graph: {
    chart: function (regionId, typeID) {
      return axios.get(crestUrl + '/market/' + regionId + '/history/?type=https://crest-tq.eveonline.com/inventory/types/' + typeID + '/')
    }
  },
  Search: {
    system: function (term) {
      return axios.get(baseUrl + '/search/system', {
        params: {
          term: term
        }
      })
    },
    region: function (term) {
      return axios.get(baseUrl + '/search/region', {
        params: {
          term: term
        }
      })
    },
    item: function (term) {
      return axios.get(baseUrl + '/search/item', {
        params: {
          term: term
        }
      })
    },
    componentByUrl: function (url) {
      return axios.get(baseUrl + '/search/component', {
        params: {
          url: url
        }
      })
    },
    similar: function (itemId) {
      return axios.get(baseUrl + '/search/similar', {
        params: {
          item_id: itemId
        }
      })
    },
    similarBpc: function (itemId) {
      return axios.get(baseUrl + '/search/similar-bpc', {
        params: {
          item_id: itemId
        }
      })
    },
    component: function (term) {
      return axios.get(baseUrl + '/search/component', {
        params: {
          term: term
        }
      })
    }
  },
  Planet: {
    schemes() {
      return axios.get(baseUrl + '/planet/schemes')
    },
    schema(url) {
      return axios.get(baseUrl + '/planet/scheme/' + url)
    }
  },
  Item: {
    popularItems: function () {
      return axios.get(baseUrl + '/item/popular')
    },
    whereUsedComponent: function (componentId, page = 1, limit = 25) {
      return axios.get(baseUrl + '/item/bpo', {
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
      return axios.get(baseUrl + '/facebook_feed')
    },
    prices: function (systemId, items) {
      return axios.get(baseUrl + '/prices/' + systemId + '/' + items)
    },
    facilities: function (activityID) {
      return axios.get(baseUrl + '/facility', {
        params: {
          activityID: activityID
        }
      })
    }
  },

  Donate: {
    donate: function () {
      return axios.get(baseUrl + '/donate')
    }
  },

  Manufacture: {
    searchBpc: function (term) {
      return axios.get(baseUrl + '/search/bpc', {
        params: {
          term: term
        }
      })
    },
    getBpc: function (url) {
      return axios.get(baseUrl + '/manufacture/' + url)
    }
  }
}