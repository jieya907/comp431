require('expose?$!expose?jQuery!jquery')
require("bootstrap-webpack")
require('./styles.css')

import React from 'react'
import { render } from 'react-dom'

import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { Provider } from 'react-redux'
import createLogger from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'

import Registration from './registration'
import Main from './main'
import Reducer from './reducers'
import Home from './Home'

const logger = createLogger()
const store = createStore(Reducer, applyMiddleware(logger))

render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={Registration}>
                <IndexRoute component={Home}/>
                <Route path="main" component={Main} />
            </Route>
        </Router>
    </Provider>,
    document.getElementById('app')
)
