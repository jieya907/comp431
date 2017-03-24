import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import Registration from "./registration.js"
import Login from "./login.js"

export const Landing = ({errorMessage, successMessage}) => (
    <div className="rol">
    	<h1> Welcome to Rice book! </h1>
        <b className="error"><strong>{errorMessage}</strong></b>
        <br/>
        <b className="success"><strong>{successMessage}</strong></b>
        <Login/>
        <Registration/>
    </div>
)

export default connect ((state) => ({location: state.location,
    errorMessage: state.errorMessage,
    successMessage: state.successMessage
}), null)(Landing)

