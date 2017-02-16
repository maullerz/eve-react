import React from 'react'
import { map } from 'lodash'

const Paginate = ({current, pages, round, onChangePage}) => {
  const _handleChangePage = page => {
    if (typeof page === 'number') onChangePage(page)
  }

  let lElem = []
  let rElem = []

  for (let i = 1; i <= round; i++) {
    let moveLeft = current - round + i - 1

    let moveRight = current + i
    if (moveLeft > 0) lElem.push(moveLeft)
    if (moveRight <= pages) rElem.push(moveRight)
    // on last iteration check positions
    if (i === round) {
      // add arrow to begin
      if (lElem.length && lElem[0] !== 1) {
        // lElem.unshift("..")
        lElem.unshift("<<")
      }
      // add arrow to end
      if (rElem.length && rElem[rElem.length - 1] !== pages) {
        // rElem.push("..")
        rElem.push(">>")
      }
    }
  }
  let pagination = map([].concat(lElem, [current], rElem), v => {
    return {
      page: (v === '<<' ? 1 : (v === '>>' ? pages : v)),
      txt: v
    }
  })

  const renderedPagination = <ul className="list">
    {pagination.map((v, i) => {
      return (<li
        onClick={_handleChangePage.bind(this, v.page)}
        className={'li-inline' + (v.page === current ? ' active' : '')}
        key={i}>{v.page === current ? v.txt + ' / ' + pages : v.txt}</li>)
    })}
  </ul>

  return pages > 1 ? renderedPagination : null
}

export default Paginate
