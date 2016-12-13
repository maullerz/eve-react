import numeraljs from '../../node_modules/numeral/numeral'

let Helper = {
  shortNum (n) {
    return numeraljs(n).format('0.[00]a')
  },

  qty (n) {
    return numeraljs(n).format('0,0')
  },

  price (n) {
    return numeraljs(n).format('0,0.00')
  }
}

export default Helper
