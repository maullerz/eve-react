import React from 'react'
import {Route, IndexRoute} from 'react-router'
import App from './controllers/App'
import Home from './controllers/Home'
import Donate from './controllers/Donate'
import Manufacture from './controllers/Manufacture'

export default (
  <Route path='/' component={App}>
    <IndexRoute component={Home} />
    <Route path='/donate' component={Donate} />
    <Route path='/manufacture(/:url)' component={Manufacture} />
  </Route>
)
