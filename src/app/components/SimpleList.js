import React from 'react'

const SimpleList = ({list}) => {
  const li = list.map(function (val, index) {
    return <li key={index}>{val}</li>
  })
  return <ul className='list'>{li}</ul>
}

export default SimpleList