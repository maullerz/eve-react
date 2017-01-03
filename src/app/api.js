import axios from 'axios'
let baseUrl = 'https://api.eve-productions.org'
// let esiUrl = 'https://esi.tech.ccp.is'
let crestUrl = 'https://crest-tq.eveonline.com'

export default {

  Graph: {
    chart: function (region_id, typeID) {
      return axios.get(crestUrl + '/market/' + region_id + '/history/?type=https://crest-tq.eveonline.com/inventory/types/' + typeID + '/')
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
    similar: function (item_id) {
      return axios.get(baseUrl + '/search/similar.json', {
        params: {
          item_id: item_id
        }
      })
    }
  },

  Main: {
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
