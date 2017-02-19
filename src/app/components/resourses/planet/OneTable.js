import React from 'react'

const OneTable = ({_class, data, hr, lh, title}) => {

  let _handleOnMouse = (itemId, e) => hr(itemId, e)
  let _handleClick = (url, e) => lh(url, e)

  let materials = data.map(val => {
    return <li className="pea" onClick={_handleClick.bind(this, val.url)} data-parent={val.item_id} data-childs={'-' + val.rel + '-'} key={val.item_id} onMouseOver={_handleOnMouse.bind(this, val.item_id)}>
      <div style={{'pointerEvents': 'none'}} className='m-b-1'>
        <img
          className='img24 pen'
          alt={val.item_id}
          src={'https://image.eveonline.com/Type/' + val.item_id + '_64.png'}/>
        {val.item_name}
      </div>
    </li>
  })

  let list = <div className={_class}>
    <table className='inside'>
      <thead>
      <tr>
        <th>{title}</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td colSpan='2' className='inside-table'>
          <ul className='list'>{materials}</ul>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
  return data ? list : null
}

export default OneTable
