import React from 'react'
import {Route, IndexRoute} from 'react-router'
import App from './controllers/App'
import Home from './controllers/Home'
import Donate from './controllers/Donate'
import Manufacture from './controllers/Manufacture'
import Market from './controllers/Market'
import Item from './controllers/Item'
import Ore from './controllers/Ore'
import Planet from './controllers/Planet'
import Moon from './controllers/Moon'

export default (
  <Route path='/' component={App}>
    <IndexRoute component={Home}/>
    <Route path='/donate' component={Donate}/>
    <Route path='/market' component={Market}/>
    <Route path='/item(/:url)' component={Item}/>
    <Route path='/manufacture(/:url)' component={Manufacture}/>
    <Route path='/ore' component={Ore}/>
    <Route path='/planet/schemes' component={Planet}/>
    <Route path='/planet/scheme/:url' component={Planet}/>
    <Route path='/moon/schemes' component={Moon}/>
    <Route path='/moon/scheme/:url' component={Moon}/>
  </Route>
)
