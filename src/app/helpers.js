import numeraljs from '../../node_modules/numeral/numeral'

let Helper;
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

  escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  },

  cfg: {
    debounceTimeout: 350
  },

  /**
   * @return {boolean}
   */
  AutocompleteMinCharacters(str) {
    return str.length >= 2
  },

  toHHMMSS(sec) {
    let sec_num = parseInt(sec, 10);

    let days = Math.floor(sec_num / 86400);
    let string_day = '';

    if (days > 1) {
      sec_num -= days * 86400
    }

    let hours = Math.floor(sec_num / 3600);
    let minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    let seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (days > 1) {
      string_day = days + "d ";
    }

    if (hours < 10) {
      hours = "0" + hours;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    return string_day + hours + ':' + minutes + ':' + seconds;
  }
};

export default Helper
