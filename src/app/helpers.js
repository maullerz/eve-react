import numeraljs from '../../node_modules/numeral/numeral'

let Helper
Helper = {
  shortNum (n) {
    return numeraljs(n).format('0.[00]a')
  },

  qty (n) {
    return numeraljs(n).format('0,0')
  },

  price (n) {
    return numeraljs(n).format('0,0.00')
  },

  escapeRegexCharacters (str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  },

  cfg: {
    debounceTimeout: 350
  },

  /**
   * @return {boolean}
   */
  AutocompleteMinCharacters (str) {
    return str.length >= 2
  },

  toHHMMSS (sec) {
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
  }
}

export default Helper
