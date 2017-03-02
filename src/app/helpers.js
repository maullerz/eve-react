import numeraljs from '../../node_modules/numeral/numeral'
import {map} from 'lodash'

let Helper = {
  shortNum(n) {
    return numeraljs(n).format('0.[00]a')
  },

  qty(n) {
    return numeraljs(n).format('0,0')
  },

  price(n) {
    return numeraljs(n).format('0,0.00')
  },

  escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  },

  const: {
    debounceTimeout: 350,
    debounceScrollTimeout: 750,
    cycles: [
      {
        val: -1,
        name: '1 cycle'
      },
      {
        val: 1,
        name: '1 day'
      },
      {
        val: 14,
        name: '14 days'
      },
      {
        val: 30,
        name: '1 month'
      }
    ]
  },

  /**
   * @return {boolean}
   */
  AutocompleteMinCharacters(str) {
    return str.length >= 2
  },

  toHHMMSS(sec) {
    let secNum = parseInt(sec, 10)

    let days = Math.floor(secNum / 86400)
    let stringDay = ''

    if (days > 1) {
      secNum -= days * 86400
    }

    let hours = Math.floor(secNum / 3600)
    let minutes = Math.floor((secNum - (hours * 3600)) / 60)
    let seconds = secNum - (hours * 3600) - (minutes * 60)

    if (days > 1) {
      stringDay = days + 'd '
    }

    if (hours < 10) {
      hours = '0' + hours
    }
    if (minutes < 10) {
      minutes = '0' + minutes
    }
    if (seconds < 10) {
      seconds = '0' + seconds
    }
    return stringDay + hours + ':' + minutes + ':' + seconds
  },
  uuid(len = 2) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < len; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  },

  manufactureQty(components, me = 0, facility_me = 1, run = 1) {
    map(components, v => {
      v['qty'] = v.orig_qty === 1 ? run : Math.ceil((v.orig_qty * ((100 - me) / 100)) * facility_me * run)
    })
    return components
  }
}

export default Helper
