import axios from 'axios';
let baseUrl = 'http://api.eve-prod.xyz';
// let esiUrl = 'https://esi.tech.ccp.is'
let crestUrl = 'https://crest-tq.eveonline.com';

axios.interceptors.request.use(
  function(config) {
    document.getElementById('ajax_loader').style = 'display:flex';
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function(response) {
    setTimeout(
      () => {
        document.getElementById('ajax_loader').style = 'display:none';
      },
      250
    );
    return response;
  },
  function(error) {
    return Promise.reject(error);
  }
);

export default {
  Graph: {
    chart: (regionId, typeID) => {
      return axios.get(
        crestUrl + '/market/' + regionId + '/history/?type=' + crestUrl + '/inventory/types/' + typeID + '/'
      );
    }
  },
  Search: {
    system(term) {
      return axios.get(baseUrl + '/search/system', {
        params: {
          term: term
        }
      });
    },
    region(term) {
      return axios.get(baseUrl + '/search/region', {
        params: {
          term: term
        }
      });
    },
    item(term) {
      return axios.get(baseUrl + '/search/item', {
        params: {
          term: term
        }
      });
    },
    componentByUrl(url) {
      return axios.get(baseUrl + '/search/component', {
        params: {
          url: url
        }
      });
    },
    similar(itemId) {
      return axios.get(baseUrl + '/search/similar', {
        params: {
          item_id: itemId
        }
      });
    },
    similarBpc(itemId) {
      return axios.get(baseUrl + '/search/similar-bpc', {
        params: {
          item_id: itemId
        }
      });
    },
    component(term) {
      return axios.get(baseUrl + '/search/component', {
        params: {
          term: term
        }
      });
    }
  },
  Planet: {
    schemes() {
      return axios.get(baseUrl + '/planet/schemes');
    },
    schema(url) {
      return axios.get(baseUrl + '/planet/scheme/' + url);
    }
  },
  Moon: {
    schemes() {
      return axios.get(baseUrl + '/moon/schemes');
    },
    schema(url) {
      return axios.get(baseUrl + '/moon/scheme/' + url);
    }
  },
  Item: {
    popularItems() {
      return axios.get(baseUrl + '/item/popular');
    },
    whereUsedComponent(componentId, page = 1, limit = 25) {
      return axios.get(baseUrl + '/item/bpo', {
        params: {
          component_id: componentId,
          page: page,
          limit: limit
        }
      });
    }
  },
  Priceall: {
    send(body) {
      return axios({
        url: `${baseUrl}/priceall`,
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: `body=${body}`
      });
    }
  },

  Main: {
    structures() {
      return axios.get(baseUrl + '/structures');
    },
    index() {
      return axios.get(baseUrl);
    },
    facebook_feed() {
      return axios.get(baseUrl + '/facebook_feed');
    },
    prices(systemId, items) {
      return axios.get(baseUrl + '/prices/' + systemId + '/' + items);
    },
    facilities(activityID) {
      return axios.get(baseUrl + '/facility', {
        params: {
          activityID: activityID
        }
      });
    }
  },

  Donate: {
    donate() {
      return axios.get(baseUrl + '/donate');
    }
  },

  Manufacture: {
    searchBpc(term) {
      return axios.get(baseUrl + '/search/bpc', {
        params: {
          term: term
        }
      });
    },
    getBpc(url) {
      return axios.get(baseUrl + '/manufacture/' + url);
    }
  }
};
