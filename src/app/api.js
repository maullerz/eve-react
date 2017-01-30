import axios from 'axios'
let baseUrl = 'https://api.eve-productions.org'
// let esiUrl = 'https://esi.tech.ccp.is'
let crestUrl = 'https://crest-tq.eveonline.com'


axios.interceptors.request.use(function (config) {
  console.log("beforeRequest!!")
  // Do something before request is sent
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Do something with response data
  return response;
}, function (error) {
  // Do something with response error
  return Promise.reject(error);
});

// actions
// const axios = _axios.create({
//   transformRequest: [function (data) {
//     console.log("transformRequest", data)
//     document.getElementById("ajax_loader").style = 'display:flex'
//     return data
//   }],
//   transformResponse: [function (data) {
//     setTimeout(() => {
//       document.getElementById("ajax_loader").style = 'display:none'
//     }, 250)
//     return JSON.parse(data)
//   }],
// });

export default {

  Graph: {
    chart: function (regionId, typeID) {
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
        body: "123"
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