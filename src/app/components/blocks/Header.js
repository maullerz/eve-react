import React  from 'react'
import {Link} from 'react-router'

const Header = () => {

  return (
    <div>
      <div className='row'>
        <div className='col-md-12'>
          <header>
            <div id='head'>
              <Link id="ah_home" to='/'>EVE-Prod.</Link>
            </div>
          </header>
        </div>
      </div>
      <div className='row'>
        <div className='col-md-12'>
          <nav id='header-menu'>
            <ul>
              <li>
                <Link id="ah_manufacture" to='/manufacture'>BPC calculator</Link>
              </li>
              <li><Link id="ah_market" to='/market'>Market</Link></li>
              <li><Link id="ah_item" to='/item'>Where components used?</Link></li>
              <li>
                <Link to="">Resourses</Link>
                <ul>
                  <li><Link id="ah_ore" to='/planet/schemes'>Planet resourses</Link></li>
                  <li><Link id="ah_ore" to='/ore'>Ore</Link></li>
                </ul>
              </li>
              <li className='red-cell'>
                <Link id="ah_donate" to='/donate'>Donate</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>)
}
export default Header