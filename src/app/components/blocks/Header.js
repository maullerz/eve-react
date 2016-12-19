import React, {Component} from 'react'
import {Link} from 'react-router'

export default class Header extends Component {

  render () {
    return (
      <div>
        <div className='row'>
          <div className='col-md-12'>
            <header>
              <div id='head'>
                <Link to='/'>EVE-Prod.</Link>
              </div>
            </header>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-12'>
            <nav id='header-menu'>
              <ul>
                <li>
                  <a href='#'>Calculators</a>
                  <ul>
                    <li><Link to='/manufacture'>BPC calculator</Link></li>
                    <li><a href='#'>Cargo, fitting</a></li>
                    <li><a href='#'>Cargo, fitting</a></li>
                    <li><a href='#'>Cargo, fitting</a></li>
                    <li><a href='#'>Cargo, fitting</a></li>

                  </ul>
                </li>
                <li><a href='#'>Market</a></li>
                <li>
                  <Link to='/Item'>Item</Link>
                </li>
                <li className='red-cell'>
                  <Link to='/donate'>Donate</Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    )
  }
}
