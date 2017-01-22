import React from 'react'
import OneColumnTable from '../OneColumnTable'

const PopularItems = ({items}) => {
  return items.length ? <OneColumnTable _class='td-padd-rb' title="Popular components" list={items} /> : null
}
export default PopularItems
