import React from 'react'
import ReactDom from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'

import { applyMiddleware, createStore } from 'redux'
import { createLogger } from 'redux-logger'
import { Provider } from 'react-redux'
import reducers from './reducers/reducers'

import '../node_modules/ti-icons/css/themify-icons.css'
import './resource/style/style.scss'
import Main from './containers/Main'

const store = createStore(
  reducers,
  PRODUCTION ? applyMiddleware() : applyMiddleware(createLogger())
)

ReactDom.render((
  <Provider store={store}>
    <BrowserRouter>
      <Route exact path='/' component={Main} />
    </BrowserRouter>
  </Provider>
), document.getElementById('app'))
