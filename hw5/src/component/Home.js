import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import Landing from './Landing/landing'
import Main from './Main/main'
import Profile from './Profile/profile'

export const Home = ({ location }) => {
    console.log(location)
    if (location === 'LANDING') {
        return (
            <div className="container-fluid">
            <Landing/>
            </div>)
    } else if (location ==='MAIN') {
        return (
            <div className="container-fluid">
            <Main/>
            </div>)
    } else if (location ==='PROFILE') {
        return (
            <div>
            <Profile/>
            </div>
        )
    }
}

export default connect ((state) => ({location: state.location}), null)(Home)
