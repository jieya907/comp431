import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

export const Main = ({ location }) => {
    console.log("in main")
    return (
        <div>
            <h1>Main Page </h1>
        </div>
    )
}

export default connect ((state) => ({location: state.location}), null)(Main)
