import React from 'react'
import UsersList from "../components/UsersList"

const OneColumnTable = ({_class, list, title}) => {

  console.log(title)
  const listUsers = list.map(function (val, index) {
    return <UsersList key={index} char={val} />
  })

  return (<table>
    <thead>
      <tr>
        <th>{title}</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td className={_class}>{listUsers}</td>
      </tr>
    </tbody>
  </table>)
}
export default OneColumnTable
