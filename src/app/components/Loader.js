import React from 'react'

import img from './../../assets/img/ajax.gif'

const Loader = () => {
  return <div className="loader" id="ajax_loader"><img src={img} alt="loader" /></div>
}

export default Loader