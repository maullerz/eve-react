import React from 'react'

import img from './../../assets/img/ajax.gif'

const Loader = ({isLoad}) => {
  return isLoad ? <div className="loader"><img src={img} alt="loader" /></div> : null
}
export default Loader