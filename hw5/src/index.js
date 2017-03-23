require('expose?$!expose?jQuery!jquery')
require("bootstrap-webpack")
require('./styles.css')

import React from 'react'
import { render } from 'react-dom'

import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'

import Reducer from './reducers'
import Home from './component/Home'

const store = createStore(Reducer)

render(
    <Provider store={store}>
        <Home/>
    </Provider>,
    document.getElementById('app')
)
