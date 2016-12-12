import axios from 'axios'
let baseUrl = 'https://silex.eve-productions.org'

export default {

  Main: {
    prices: function (system_id, items) {
      return axios.get(baseUrl + '/prices/' + system_id + '/' + items)
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
