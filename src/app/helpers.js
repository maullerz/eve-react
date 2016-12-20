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
  }
};

export default Helper
