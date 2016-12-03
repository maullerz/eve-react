import axios from 'axios'
let baseUrl = 'https://silex.eve-productions.org'

export default {

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
    }
  }
}
