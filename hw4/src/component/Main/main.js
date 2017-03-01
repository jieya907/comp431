import React, { PropTypes } from 'react'
import { connect } from 'react-redux'


import Articles from './articles/articles'
import User from "./user/user"
import Sidebar from "./user/sidebar"
import * as Actions from '../../actions'
export const Main = ({ location, routePage }) => {
    const _route = (page) => {
        routePage(page)
    }

    return (
        <div>
            <h1>Main Page </h1>
            <button onClick={()=>_route('PROFILE')}>Profile Page </button>
            <button onClick={()=>_route('LANDING')}>Log Out</button>
            <Sidebar/>
            <User/>
            <Articles/>
        </div>
    )
}

Main.propTypes = {
    location: PropTypes.string.isRequired,
    routePage: PropTypes.func.isRequired,
}

export default connect ((state) => ({location: state.location}), 
    (dispatch) => {
        return {
            routePage : (page) => dispatch({ type: Actions.ROUTE_TO, location: page })
        }
    }
)(Main)
