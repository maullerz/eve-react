import React from 'react'
import OneColumnTable from '../home/OneColumnTable'

const indexTables = ({listTables}) => {
  return (
    <div className='row'>
      <div className='col-md-4 col-first'>
        <OneColumnTable data={listTables[0]} />
      </div>
      <div className='col-md-4 col-midd'>
        <OneColumnTable data={listTables[1]} />
      </div>
      <div className='col-md-4 col-last'>
        <OneColumnTable data={listTables[2]} />
      </div>
    </div>
  )
}
export default indexTables
