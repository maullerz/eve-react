import React from 'react'
import ItemsList from "./ItemsList"

const OneColumnTable = ({_class, list, title,clickItem}) => {

  const listItems = list.map(function (val, index) {
    return <ItemsList key={index} clickItem={clickItem} item={val} />
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
