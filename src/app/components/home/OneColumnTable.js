import React from 'react'
import SimpleList from "../SimpleList"

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
