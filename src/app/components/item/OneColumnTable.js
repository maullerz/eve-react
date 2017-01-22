import React from 'react'
import ItemsList from "./ItemsList"

const OneColumnTable = ({_class, list, title}) => {

  const listItems = list.map(function (val, index) {
    console.log("val", val)
    return <ItemsList key={index} item={val} />
  })

  return <table>
    <thead>
      <tr>
        <th>{title}</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td className={_class}>{listItems}</td>
      </tr>
    </tbody>
  </table>
}
export default OneColumnTable
