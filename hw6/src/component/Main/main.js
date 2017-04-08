import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { logoutFetch } from '../../backend.js'

import Articles from './articles/articles'
import Sidebar from "./user/sidebar"
import * as Actions from '../../actions'
export const Main = ({ location, message, routePage, logOut }) => {
    const _route = (page) => {
        routePage(page)
    }

    const _logout = () => {
        logOut();
        routePage('LANDING')
    }
    return (
        <div className="row">
            <h1>Main Page </h1>
            <b name="mainMessage">{message} </b>
            <button id="btnProfile" onClick={()=>_route('PROFILE')}>Profile Page </button>
            <button id="logout" onClick={()=>_logout()}>Log Out</button>
            <Sidebar/>
            <Articles/>
        </div>
    )
}

Main.propTypes = {
    location: PropTypes.string.isRequired,
    routePage: PropTypes.func.isRequired,
}

export default connect ((state) => ({
    location: state.location,
    message: state.successMessage,
}), 
    (dispatch) => {
        return {
            routePage : (page) => Actions.routeTo(page)(dispatch),
            logOut: ()=> logoutFetch()(dispatch)
        }
    }
)(Main)
