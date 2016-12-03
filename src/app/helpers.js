import numeraljs from "../../node_modules/numeral/numeral";

let Helper = {
  shortNum(n){
    return numeraljs(n).format("0.[00]a");
  }
};

export default Helper;