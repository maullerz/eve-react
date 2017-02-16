import React from 'react'
import SimpleList from "../blocks/_simple_list"

const OneColumnTable = ({data}) => {

  return <table>
    <thead>
      <tr>
        <th>{data.title}</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td className="t-a_l">
          <SimpleList list={data.list} />
        </td>
      </tr>
    </tbody>
  </table>
}

export default OneColumnTable
