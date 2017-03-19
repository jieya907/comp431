import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import Registration from "./registration.js"
import Login from "./login.js"

export const Landing = () => (
    <div className="rol">
    	<h1> Welcome to Rice book! </h1>
        <Login/>
        <Registration/>
    </div>
)

export default connect ((state) => ({location: state.location}), null)(Landing)

