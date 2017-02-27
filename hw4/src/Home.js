import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import Registration from './registration'
import Main from './main'


export const Home = ({ location }) => {
    console.log(location)
    if (location === 'LANDING') {
        return (
            <div>
            <Registration/>
            </div>)
    } else if (location ==='MAIN') {
        return (
            <div>
            <Main/>
            </div>)
    }
}

export default connect ((state) => ({location: state.location}), null)(Home)
