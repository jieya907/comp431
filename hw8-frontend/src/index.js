require('expose?$!expose?jQuery!jquery')
require("bootstrap-webpack")
require('../dist/styles.css')

import React from 'react'
import { render } from 'react-dom'

import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'

import Reducer from './reducers'
import Home from './component/Home'
import { checkLogin } from './backend.js'
const logger = createLogger()

const store = createStore(Reducer)

checkLogin()(store.dispatch)

render(
    <Provider store={store}>
        <Home/>
    </Provider>,
    document.getElementById('app')
)
